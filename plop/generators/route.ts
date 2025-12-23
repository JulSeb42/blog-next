import type { NodePlopAPI, ActionType } from "plop"
import { toKebabCase } from "@julseb-lib/utils"
import { getApiDirectories } from "../utils/index.js"
import { CLIENT_PATH, TEMPLATES_PATH } from "../utils/index.js"

export default (plop: NodePlopAPI) => {
	const { setGenerator } = plop

	setGenerator("route", {
		description: "Generate a new API route",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "Enter route's name",
				validate: input => {
					if (input[input.length - 1] === "s") {
						return "Name must be singular"
					}
					return true
				},
			},
			{
				type: "list",
				name: "directory",
				message: "Which API directory?",
				choices: async () => {
					const directories = await getApiDirectories()
					return [...directories, "Create new directory"]
				},
			},
			{
				type: "input",
				name: "newDirectory",
				message: "Enter new directory name",
				when: (answers: any) =>
					answers.directory === "Create new directory",
				validate: input => {
					if (input[input.length - 1] === "s") {
						return "Name must be singular"
					}
					return true
				},
			},
			{
				type: "list",
				name: "method",
				message: "Which method is it?",
				choices: ["GET", "POST", "PUT", "DELETE"],
			},
		],
		actions: data => {
			const targetDirectory =
				data?.directory === "Create new directory"
					? data?.newDirectory
					: data?.directory

			const actions: Array<ActionType> = [
				{
					type: "add",
					path: `${CLIENT_PATH}/app/api/${targetDirectory}/{{>kebabName}}/route.ts`,
					templateFile: `${TEMPLATES_PATH}/route.hbs`,
				},
				{
					type: "modifyServerPaths",
				},
			]

			if (data?.newDirectory) {
				actions.push(
					"Creating a new type",
					{
						type: "add",
						path: `${CLIENT_PATH}/types/{{ pascalCase newDirectory }}.type.ts`,
						templateFile: `${TEMPLATES_PATH}/type-api.hbs`,
					},
					{
						type: "modify",
						path: `${CLIENT_PATH}/types/index.ts`,
						template: `export * from "./{{ pascalCase newDirectory }}.type"\n$1`,
						pattern: /(\/\* Prepend export - DO NOT REMOVE \*\/)/g,
					},
					"Creating a new API service",
					{
						type: "add",
						path: `${CLIENT_PATH}/api/{{ kebabCase newDirectory }}.service.ts`,
						templateFile: `${TEMPLATES_PATH}/service.hbs`,
					},
					{
						type: "modify",
						path: `${CLIENT_PATH}/api/index.ts`,
						template: `export * from "./{{ kebabCase newDirectory }}.service"\n$1`,
						pattern: /(\/\* Prepend export - DO NOT REMOVE \*\/)/g,
					},
					"Creating a new model",
					{
						type: "add",
						path: `${CLIENT_PATH}/models/{{ pascalCase newDirectory }}.model.ts`,
						templateFile: `${TEMPLATES_PATH}/model-api.hbs`,
					},
					{
						type: "modify",
						path: `${CLIENT_PATH}/models/index.ts`,
						template: `export * from "./{{ pascalCase newDirectory }}.model"\n$1`,
						pattern:
							/(\/\* Prepend new model - DO NOT REMOVE \*\/)/g,
					},
				)
			}

			actions.push("Adding your new API route to its service", {
				type: "modify",
				path: `${CLIENT_PATH}/api/${toKebabCase(targetDirectory)}.service.ts`,
				template: `{{ camelCase name }} = async () => await http.{{ lowerCase method }}(generateRoute("{{ constantCase name }}"))\n\n\t$1`,
				pattern: /(\/\* Prepend route - DO NOT REMOVE \*\/)/g,
			})

			return actions
		},
	})
}
