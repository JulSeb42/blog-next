import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import "dotenv/config"

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
})

export async function PUT(req: Request) {
	try {
		if (
			!process.env.CLOUDINARY_NAME ||
			!process.env.CLOUDINARY_KEY ||
			!process.env.CLOUDINARY_SECRET
		) {
			console.error("❌ Missing Cloudinary configuration")
			return NextResponse.json(
				{
					errorMessage:
						"Server configuration error: Missing Cloudinary credentials",
				},
				{ status: 500 },
			)
		}

		const formData = await req.formData()
		const file = formData.get("image") as File

		if (!file) {
			console.error("❌ No file uploaded")
			return NextResponse.json(
				{
					errorMessage: "No file uploaded",
				},
				{ status: 400 },
			)
		}

		if (!file.type.startsWith("image/")) {
			console.error("❌ Invalid file type:", file.type)
			return NextResponse.json(
				{
					errorMessage: "Only image files are allowed",
				},
				{ status: 400 },
			)
		}

		if (file.size > 5 * 1024 * 1024) {
			console.error("❌ File too large:", file.size)
			return NextResponse.json(
				{
					errorMessage: "File size must be less than 5MB",
				},
				{ status: 400 },
			)
		}

		const bytes = await file.arrayBuffer()
		const buffer = Buffer.from(bytes)

		const uploadResult = await new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{
						resource_type: "auto",
						folder: "blog-next",
						allowed_formats: [
							"jpg",
							"jpeg",
							"png",
							"gif",
							"webp",
							"svg",
						],
					},
					(error: any, result: any) => {
						if (error) {
							console.error("❌ Cloudinary upload error:", error)
							reject(error)
						} else {
							resolve(result)
						}
					},
				)
				.end(buffer)
		})

		const result = uploadResult as any

		return NextResponse.json({
			image_url: result.secure_url,
			public_id: result.public_id,
			width: result.width,
			height: result.height,
			format: result.format,
			bytes: result.bytes,
		})
	} catch (error) {
		console.error("❌ Upload error:", error)
		return NextResponse.json(
			{
				errorMessage: "Upload failed",
				details:
					error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		)
	}
}
