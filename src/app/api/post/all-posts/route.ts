import { NextResponse } from "next/server"
import { connectDb } from "lib/server"
import { PostModel, CategoryModel, UserModel } from "models"

export async function GET(req: Request) {
	await connectDb()

	try {
		const { searchParams } = new URL(req.url)
		const page = Number(searchParams.get("page")) ?? 1
		const limit = Number(searchParams.get("limit")) ?? 20
		const search = searchParams.get("search")
		const category = searchParams.get("category")
		const author = searchParams.get("author")
		const draft = searchParams.get("draft")

		const foundCategory = category
			? await CategoryModel.findOne({ slug: category })
			: undefined

		const foundAuthor = author
			? await UserModel.findOne({ slug: author })
			: undefined

		const filter: any = {}

		if (search) {
			filter.$or = [
				{ title: { $regex: search, $options: "i" } },
				{ tags: { $regex: search, $options: "i" } },
			]
		}

		if (category && foundCategory) {
			filter.category = foundCategory._id
		}

		if (author && foundAuthor) {
			filter.author = foundAuthor._id
		}

		if (draft) {
			filter.draft = draft === "true" ? true : false
		}

		if (page) {
			const skip = (page - 1) * limit

			const posts = await PostModel.find(filter)
				.skip(skip)
				.limit(limit)
				.sort({ updatedAt: -1, createdAt: -1 })

			const totalPosts = await PostModel.countDocuments(filter)
			const totalPages = Math.ceil(totalPosts / limit)
			const hasMore = page < totalPages

			return NextResponse.json(
				{
					posts,
					pagination: {
						currentPage: page,
						totalPages,
						totalItems: totalPosts,
						hasMore,
						limit,
					},
				},
				{ status: 200 },
			)
		}

		const posts = await PostModel.find()

		if (!posts)
			return NextResponse.json(
				{ message: "Posts not found" },
				{ status: 404 },
			)

		return NextResponse.json(posts, { status: 200 })
	} catch (err) {
		console.error(err)
		return NextResponse.json(
			{ message: "An error occurred" },
			{ status: 500 },
		)
	}
}
