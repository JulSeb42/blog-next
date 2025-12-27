import { NextResponse } from "next/server"
import { connectDb } from "lib/server"
import { PostModel } from "models"

export async function PUT(
	req: Request,
	{
		params,
	}: {
		params: Promise<{ id: string }>
	},
) {
	await connectDb()

	try {
		const { id } = await params
		const requestBody = await req.json()

		const updatedPost = await PostModel.findByIdAndUpdate(id, requestBody, {
			new: true,
		})

		return NextResponse.json(updatedPost, { status: 201 })
	} catch (err) {
		console.error(err)
		return NextResponse.json(
			{ message: "An error occurred" },
			{ status: 500 },
		)
	}
}
