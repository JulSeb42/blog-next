import { NextResponse } from "next/server"
import { ServerCookies, connectDb } from "lib/server"
import { UserModel } from "models"
import { COMMON_TEXTS } from "data"

export async function POST(req: Request) {
	await connectDb()

	try {
		const authToken = await ServerCookies.getAuthToken()

		if (!authToken)
			return NextResponse.json({ loggedIn: false, message: "No token" })

		const { _id, verifyToken } = await req.json()

		const user = await UserModel.findById(_id)

		if (!user)
			return NextResponse.json(
				{
					message: COMMON_TEXTS.ERRORS.USER_NOT_EXIST,
				},
				{ status: 400 },
			)

		if (user?.verifyToken !== verifyToken)
			return NextResponse.json(
				{ message: COMMON_TEXTS.ERRORS.VERIFY_TOKEN_NOT_MATCH },
				{ status: 400 },
			)

		const updatedUser = await UserModel.findByIdAndUpdate(
			_id,
			{ verified: true },
			{ new: true },
		)

		return NextResponse.json(updatedUser, { status: 201 })
	} catch (err: any) {
		return NextResponse.json(
			{ error: `Your account couldn't be verified: ${err}` },
			{ status: 400 },
		)
	}
}
