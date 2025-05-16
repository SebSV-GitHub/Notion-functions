import net from "node:net";
import type {
	APIGatewayRequestAuthorizerEventV2,
	APIGatewaySimpleAuthorizerResult,
} from "aws-lambda";
import IPWhitelist from "../ip-whitelist.json";

async function handler(
	event: APIGatewayRequestAuthorizerEventV2
): Promise<APIGatewaySimpleAuthorizerResult> {
	console.log("[Authorizer]: Validating source IP");

	const { sourceIp } = event.requestContext.http;

	const ipFamily = net.isIP(sourceIp);
	if (!(ipFamily === 4 || ipFamily === 6)) {
		return {
			isAuthorized: false,
		};
	}

	const blocklist = new net.BlockList();

	for (const subnet of IPWhitelist.v4) {
		const [address, prefix] = subnet.split("/");
		blocklist.addSubnet(address, Number(prefix), "ipv4");
	}

	return { isAuthorized: blocklist.check(sourceIp) };
}

export { handler };
