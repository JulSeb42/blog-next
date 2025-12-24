import { NextResponse } from "next/server"
import { connectDb } from "lib/server"
import { PostModel } from "models"

export async function GET() {
	await connectDb()

	try {
		const featuredPosts = await PostModel.find({ featured: true }).sort({
			updatedAt: -1,
			createdAt: -1,
		})

		if (!featuredPosts)
			return NextResponse.json(
				{ message: "Posts not found" },
				{ status: 404 },
			)

		return NextResponse.json(featuredPosts, { status: 200 })
	} catch (err) {
		console.error(err)
		return NextResponse.json(
			{ message: "An error occurred" },
			{ status: 500 },
		)
	}
}
