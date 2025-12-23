import { NextResponse } from "next/server"
import { getRandomString } from "@julseb-lib/utils"
import { connectDb, sendMail } from "lib/server"
import { UserModel } from "models"
import { SITE_DATA } from "data"

export async function PUT(
	_: any,
	{ params }: { params: Promise<{ id: string }> },
) {
	await connectDb()

	try {
		const { id } = await params

		const user = await UserModel.findById(id)

		if (!user)
			return NextResponse.json(
				{ message: "This user does not exist." },
				{ status: 404 },
			)

		const resetToken = getRandomString()

		const updatedUser = await UserModel.findByIdAndUpdate(
			id,
			{ resetToken },
			{ new: true },
		)

		sendMail(
			user.email,
			`Reset your password on ${SITE_DATA.NAME}`,
			`<p>Hello ${updatedUser?.fullName},<br /><br />To reset your password, <a href="${process.env.ORIGIN}/reset-password?id=${updatedUser!._id}&token=${resetToken}">click here</a>.</p>`,
		)

		return NextResponse.json(
			{
				message: `An email was just sent to ${updatedUser?.fullName} to reset their password!`,
			},
			{ status: 201 },
		)
	} catch (err) {
		console.error(err)
		return NextResponse.json(
			{ message: "An error occurred" },
			{ status: 500 },
		)
	}
}
