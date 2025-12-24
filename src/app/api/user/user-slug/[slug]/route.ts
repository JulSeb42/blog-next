import { NextResponse } from "next/server"
import { connectDb } from "lib/server"
import { UserModel } from "models"

export async function GET(
	_: any,
	{ params }: { params: Promise<{ slug: string }> },
) {
	await connectDb()

	try {
		const { slug } = await params

		const user = await UserModel.findOne({ slug })

		if (!user)
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 },
			)

		return NextResponse.json(user, { status: 200 })
	} catch (err) {
		console.error(err)
		return NextResponse.json(
			{ message: "An error occurred" },
			{ status: 500 },
		)
	}
}
