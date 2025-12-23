import { NextResponse } from "next/server"
import { getRandomString } from "@julseb-lib/utils"
import { connectDb, sendMail } from "lib/server"
import { UserModel } from "models"
import { COMMON_TEXTS } from "data"

export async function POST(req: Request) {
	await connectDb()

	try {
		const { email } = await req.json()
		const user = await UserModel.findOne({ email })

		if (!user)
			return NextResponse.json({
				message: COMMON_TEXTS.ERRORS.USER_NOT_EXIST,
			})

		const resetToken = getRandomString()

		const updatedUser = await UserModel.findByIdAndUpdate(
			user._id,
			{ resetToken },
			{ new: true },
		)

		sendMail(
			user.email,
			COMMON_TEXTS.EMAIL_RESET_PASSWORD_TITLE,
			COMMON_TEXTS.EMAIL_RESET_PASSWORD_BODY(user, resetToken),
		)

		return NextResponse.json(updatedUser, { status: 201 })
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 401 })
	}
}
