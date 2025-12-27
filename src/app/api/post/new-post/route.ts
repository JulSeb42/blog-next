import { NextResponse } from "next/server"
import { connectDb } from "lib/server"
import { PostModel } from "models"

export async function POST(req: Request) {
	await connectDb()

	try {
		const requestBody = await req.json()

		const newPost = await PostModel.create(requestBody)

		return NextResponse.json(newPost, { status: 201 })
	} catch (err) {
		console.error(err)
		return NextResponse.json(
			{ message: "An error occurred" },
			{ status: 500 },
		)
	}
}
