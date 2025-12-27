import { NextResponse } from "next/server"
import { connectDb } from "lib/server"
import { CategoryModel } from "models"

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	await connectDb()

	try {
		const { id } = await params
		const requestBody = await req.json()

		const existingCategory = await CategoryModel.findOne({
			slug: requestBody.slug,
			_id: { $ne: id },
		})

		if (existingCategory)
			return NextResponse.json(
				{
					message: "There is already a category with this name",
				},
				{ status: 400 },
			)

		const updatedCategory = await CategoryModel.findByIdAndUpdate(
			id,
			requestBody,
			{ new: true },
		)

		return NextResponse.json(updatedCategory, { status: 201 })
	} catch (err) {
		console.error(err)
		return NextResponse.json(
			{ message: "An error occurred" },
			{ status: 500 },
		)
	}
}
