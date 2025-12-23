import { NextResponse } from "next/server"
import { connectDb } from "lib/server"
import { UserModel } from "models"

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	await connectDb()

	try {
		const { id } = await params
		const { role } = await req.json()

		const user = await UserModel.findById(id)

		if (!user)
			return NextResponse.json(
				{ message: "This user does not exist." },
				{ status: 404 },
			)

		const updatedUser = await UserModel.findByIdAndUpdate(
			id,
			{ role },
			{ new: true },
		)

		return NextResponse.json(updatedUser, { status: 201 })
	} catch (err) {
		console.error(err)
		return NextResponse.json(
			{ message: "An error occurred" },
			{ status: 500 },
		)
	}
}
