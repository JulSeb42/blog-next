import { NextResponse } from "next/server"
import { connectDb } from "lib/server"
import { PostModel } from "models"

export async function DELETE(
	_: any,
	{ params }: { params: Promise<{ id: string }> },
) {
	await connectDb()

	try {
		const { id } = await params

		await PostModel.findByIdAndDelete(id)

		return NextResponse.json("Post has been deleted successfully", {
			status: 201,
		})
	} catch (err) {
		console.error(err)
		return NextResponse.json(
			{ message: "An error occurred" },
			{ status: 500 },
		)
	}
}
