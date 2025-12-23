import { NextResponse } from "next/server"
import { connectDb } from "lib/server"
import { UserModel } from "models"

export async function DELETE(
	_: any,
	{ params }: { params: Promise<{ id: string }> },
) {
	await connectDb()

	try {
		const { id } = await params
		console.log({ id })

		await UserModel.findByIdAndDelete(id)

		return NextResponse.json(
			{ message: "User has been deleted" },
			{ status: 201 },
		)
	} catch (err) {
		console.error("Error while deleting user: ", err)
		return NextResponse.json(
			{ message: "Error while deleting user" },
			{ status: 500 },
		)
	}
}
