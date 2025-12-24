import { NextResponse } from "next/server"
import { connectDb } from "lib/server"
import { CategoryModel } from "models"

export async function GET() {
	await connectDb()

	try {
		const categories = await CategoryModel.find()

		return NextResponse.json(categories, { status: 200 })
	} catch (err) {
		console.error(err)
		return NextResponse.json(
			{ message: "An error occurred" },
			{ status: 500 },
		)
	}
}
