import { a, defineData, defineFunction } from "@aws-amplify/backend";

export const MODEL_ID = "mistral.mistral-7b-instruct-v0:2";

export const generateSummaryFunction = defineFunction({
	entry: "./generateSummary.js",
	environment: {
		MODEL_ID,
	},
});

const schema = a.schema({
	generateSummary: a
		.query()
		.arguments({ prompt: a.string().required() })
		.returns(a.string())
		.authorization((allow) => [allow.publicApiKey()])
		.handler(a.handler.function(generateSummaryFunction)),
});

export const data = defineData({
	schema,
	authorizationModes: {
		defaultAuthorizationMode: "apiKey",
		apiKeyAuthorizationMode: {
			expiresInDays: 30,
		},
	},
});
