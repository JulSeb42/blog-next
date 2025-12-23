import { toKebabCase } from "@julseb-lib/utils"
import { CLIENT_PATH, TEMPLATES_PATH, toTitleCase } from "../utils/index.js"
import type { NodePlopAPI, ActionType } from "plop"

export default (plop: NodePlopAPI) => {
	const { setGenerator } = plop

	setGenerator("page", {
		description: "Generate page",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "Enter page's name",
			},
			{
				type: "input",
				name: "title",
				message: "Enter page title",
				default: (data: { name: string }) => toTitleCase(data.name),
			},
			{
				type: "input",
				name: "path",
				message: "Enter page's path",
				default: (data: { name: string }) =>
					`/${toKebabCase(data.name)}`,
			},
			{
				type: "list",
				name: "type",
				message: "What type of page is it?",
				choices: ["all", "protected", "anon", "admin"],
				default: "all",
			},
			{
				type: "confirm",
				name: "layout",
				message: "Add a new layout?",
				default: false,
			},
			{
				type: "confirm",
				name: "async",
				message: "Is this an async page?",
				default: false,
			},
		],
		actions: data => {
			const actions: Array<ActionType> = ["Creating your new page"]

			const path = data?.path.replace("/", "")
			const fullPath = path[0] === "/" ? path.replace("/", "") : path

			actions.push({
				type: "add",
				path: `${CLIENT_PATH}/app/${fullPath}/page.tsx`,
				templateFile:
					data?.type === "admin"
						? `${TEMPLATES_PATH}/admin-page.hbs`
						: `${TEMPLATES_PATH}/page.hbs`,
			})

			if (data?.layout) {
				actions.push("Creating your new layout", {
					type: "add",
					path: `${CLIENT_PATH}/app/${fullPath}/layout.tsx`,
					templateFile: `${TEMPLATES_PATH}/layout.hbs`,
				})
			}

			return actions
		},
	})
}
