import { NextResponse } from "next/server"
import { connectDb } from "lib/server"
import { CommentModel } from "models"

export async function GET() {
	await connectDb()

	try {
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
