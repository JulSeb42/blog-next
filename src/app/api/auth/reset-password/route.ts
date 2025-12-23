import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDb } from "lib/server"
import { UserModel } from "models"
import { COMMON_TEXTS } from "data"
import { SALT_ROUNDS } from "utils"

export async function POST(req: Request) {
	await connectDb()

	try {
		const { password, resetToken, _id } = await req.json()

		const user = await UserModel.findById(_id)

		if (!user)
			return NextResponse.json(
				{
					message: COMMON_TEXTS.ERRORS.USER_NOT_EXIST,
				},
				{ status: 400 },
			)

		if (user.resetToken !== resetToken)
			return NextResponse.json(
				{ message: COMMON_TEXTS.ERRORS.PROBLEM_RESET_PASSWORD },
				{ status: 400 },
			)

		const salt = bcrypt.genSaltSync(SALT_ROUNDS)
		const hashedPassword = bcrypt.hashSync(password, salt)

		const updatedUser = await UserModel.findByIdAndUpdate(
			_id,
			{ password: hashedPassword },
			{ new: true },
		).select("-password")

		return NextResponse.json(
			{ user: updatedUser, message: COMMON_TEXTS.PASSWORD_RESET },
			{ status: 201 },
		)
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 401 })
	}
}
