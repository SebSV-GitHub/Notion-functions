import type {
	APIGatewayRequestAuthorizerEventV2,
	APIGatewaySimpleAuthorizerResult,
} from "aws-lambda";

function handler(
	event: APIGatewayRequestAuthorizerEventV2
): APIGatewaySimpleAuthorizerResult {
	console.log(event);

	return {
		isAuthorized: true,
	};
}

export { handler };
