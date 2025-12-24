import { NextResponse } from "next/server"
import { connectDb } from "lib/server"
import { CommentModel, PostModel } from "models"

export async function GET(req: Request) {
	await connectDb()

	try {
		const { searchParams } = new URL(req.url)
		const page = Number(searchParams.get("page")) ?? 1
		const limit = Number(searchParams.get("limit")) ?? 10
		const post = searchParams.get("post")

		const foundPost = post
			? await PostModel.findOne({ slug: post })
			: undefined

		const filter: any = {}

		if (post && foundPost) {
			filter.post = foundPost._id
		}

		if (page) {
			const skip = (page - 1) * limit

			const comments = await CommentModel.find(filter)
				.skip(skip)
				.limit(limit)
				.sort({ createdAt: -1 })

			const totalComments = await CommentModel.countDocuments(filter)
			const totalPages = Math.ceil(totalComments / limit)
			const hasMore = page < totalPages

			return NextResponse.json(
				{
					comments,
					pagination: {
						currentPage: page,
						totalPages,
						totalItems: totalComments,
						hasMore,
						limit,
					},
				},
				{ status: 200 },
			)
		}

		const comments = await CommentModel.find()

		if (!comments)
			return NextResponse.json(
				{ message: "Comments not found" },
				{ status: 404 },
			)

		return NextResponse.json(comments, { status: 200 })
	} catch (err) {
		console.error(err)
		return NextResponse.json(
			{ message: "An error occurred" },
			{ status: 500 },
		)
	}
}
