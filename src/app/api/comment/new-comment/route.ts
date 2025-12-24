import { NextResponse } from "next/server"
import { connectDb } from "lib/server"
import { CommentModel } from "models"

export async function POST(req: Request) {
	await connectDb()

	try {
		const requestBody = await req.json()

		const newComment = await CommentModel.create(requestBody)

		return NextResponse.json(newComment, { status: 201 })
	} catch (err) {
		console.error(err)
		return NextResponse.json(
			{ message: "An error occurred" },
			{ status: 500 },
		)
	}
}
