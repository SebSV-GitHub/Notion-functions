import { v4 as uuid } from "uuid";
import type {
	APIGatewayProxyEventV2,
	APIGatewayProxyResultV2,
} from "aws-lambda";

async function handler(
	event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
	console.log(event);
	return {
		statusCode: 200,
		body: JSON.stringify({
			id: uuid(),
		}),
	};
}

export { handler };
