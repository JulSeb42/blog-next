import { NextResponse } from "next/server"
import { connectDb } from "lib/server"
import { CategoryModel } from "models"

export async function GET(
	_: any,
	{ params }: { params: Promise<{ id: string }> },
) {
	await connectDb()

	try {
		const { id } = await params

		const category = await CategoryModel.findById(id)

		if (!category)
			return NextResponse.json(
				{ message: "Category not found" },
				{ status: 404 },
			)

		return NextResponse.json(category, { status: 200 })
	} catch (err) {
		console.error(err)
		return NextResponse.json(
			{ message: "An error occurred" },
			{ status: 500 },
		)
	}
}
