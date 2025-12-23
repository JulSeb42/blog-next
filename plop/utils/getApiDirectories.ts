import { readdir } from "fs/promises"
import { join } from "path"

export async function getApiDirectories() {
	const apiPath = join(process.cwd(), "src/app/api")
	const directories = await readdir(apiPath, { withFileTypes: true })
	return directories
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name)
}
