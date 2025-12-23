import { http } from "./http-common"
import { generateServerRoute } from "utils"
import type { SERVER_PATHS } from "./server-paths"

type PATHS = keyof typeof SERVER_PATHS.UPLOADER

const generateRoute = (route: Exclude<PATHS, "ROOT">) =>
	generateServerRoute("UPLOADER", route)

const errorHandler = (err: any) => {
	throw err()
}

class CloudinaryService {
	uploadImage = async (file: any) =>
		await http
			.put(generateRoute("UPLOAD_PICTURE"), file, {
				headers: {
					"Content-Type": undefined, // Let browser set multipart/form-data with boundary
				},
			})
			.then(res => res.data)
			.catch(errorHandler)

	/* Prepend route - DO NOT REMOVE */
}

export const cloudinaryService = new CloudinaryService()
