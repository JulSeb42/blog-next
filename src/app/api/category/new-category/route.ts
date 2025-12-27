import { NextResponse } from "next/server"
import { connectDb } from "lib/server"
import { CategoryModel } from "models"

export async function POST(req: Request) {
	await connectDb()

	try {
		const requestBody = await req.json()

		const existingCategory = await CategoryModel.findOne({
			slug: requestBody.slug,
		})

		if (existingCategory)
			return NextResponse.json(
				{
					message: "There is already a category with this name",
				},
				{ status: 400 },
			)

		const newCategory = await CategoryModel.create(requestBody)

		return NextResponse.json(newCategory, { status: 201 })
	} catch (err) {
		console.error(err)
		return NextResponse.json(
			{ message: "An error occurred" },
			{ status: 500 },
		)
	}
}
