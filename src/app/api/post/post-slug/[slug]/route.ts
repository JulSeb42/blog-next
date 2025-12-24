import { NextResponse } from "next/server"
import { connectDb } from "lib/server"
import { PostModel } from "models"

export async function GET(
	_: any,
	{ params }: { params: Promise<{ slug: string }> },
) {
	await connectDb()

	try {
		const { slug } = await params

		const post = await PostModel.findOne({ slug })
			.populate("category")
			.populate("author")

		if (!post)
			return NextResponse.json(
				{ message: "Post not found" },
				{ status: 404 },
			)

		return NextResponse.json(post, { status: 200 })
	} catch (err) {
		console.error(err)
		return NextResponse.json(
			{ message: "An error occurred" },
			{ status: 500 },
		)
	}
}
