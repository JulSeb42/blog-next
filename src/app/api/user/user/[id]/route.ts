import { NextResponse } from "next/server"
import { connectDb } from "lib/server"
import { UserModel } from "models"
import { COMMON_TEXTS } from "data"

export async function GET(
	_: any,
	{ params }: { params: Promise<{ id: string }> },
) {
	await connectDb()

	try {
		const user = await UserModel.findById((await params).id).select(
			"-password",
		)

		if (!user)
			return NextResponse.json(
				{ message: COMMON_TEXTS.ERRORS.USER_NOT_EXIST },
				{ status: 404 },
			)

		return NextResponse.json(user, { status: 200 })
	} catch (err) {
		console.error("Get user error:", err)
		return NextResponse.json(
			{ error: "Failed to fetch user" },
			{ status: 500 },
		)
	}
}
