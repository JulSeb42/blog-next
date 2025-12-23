import fs from "fs"
import path from "path"
import { toConstantCase } from "@julseb-lib/utils"

export default function modifyServerPaths(answers: Record<string, any>) {
	const data = {
		directory:
			answers.directory === "Create new directory"
				? answers.newDirectory
				: answers.directory,
		name: answers.name,
		method: answers.method,
		isNewDirectory: answers.directory === "Create new directory",
	}
	const serverPathsPath = path.resolve("src/api/server-paths.ts")
	let content = fs.readFileSync(serverPathsPath, "utf8")

	const directoryUpper = data.directory.toUpperCase()
	const constantName = toConstantCase(data.name)
	const pathValue = `/${data.name}`

	if (data.isNewDirectory) {
		const rootComment = "/* Prepend path root - DO NOT REMOVE */"
		const newRootLine = `${directoryUpper}: "/${data.directory}",\n\t${rootComment}`
		content = content.replace(rootComment, newRootLine)

		const serverPathComment = "/* Prepend server path - DO NOT REMOVE */"
		const newSubObject = `${directoryUpper}: {
\t\tROOT: SERVER_PATHS_ROOT.${directoryUpper},
\t\t${constantName}: "${pathValue}", // ${data.method}
\t},
\t${serverPathComment}`
		content = content.replace(serverPathComment, newSubObject)
	} else {
		const subObjectPattern = new RegExp(
			`(${directoryUpper}:\\s*{[\\s\\S]*?)(\\n\\t},)`,
			"g",
		)
		const match = content.match(subObjectPattern)

		if (match) {
			const replacement = content.replace(subObjectPattern, fullMatch => {
				return fullMatch.replace(
					/(\n\t},)$/,
					`\n\t\t${constantName}: "${pathValue}", // ${data.method}$1`,
				)
			})
			content = replacement
		} else {
			console.log(`Could not find ${directoryUpper} sub-object to modify`)
			console.log(`Available content:`, content.substring(0, 500))
		}
	}

	fs.writeFileSync(serverPathsPath, content, "utf8")
	return `Updated server-paths.ts with ${directoryUpper}.${constantName}`
}
