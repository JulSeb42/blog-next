import { NextResponse } from "next/server"
import { connectDb, sendMail } from "lib/server"
import { UserModel } from "models"
import { SITE_DATA } from "data"

export async function DELETE(
	_: any,
	{ params }: { params: Promise<{ id: string }> },
) {
	await connectDb()

	try {
		const { id } = await params

		const deletedUser = await UserModel.findByIdAndDelete(id)

		if (!deletedUser)
			return NextResponse.json(
				{ message: "This user does not exist." },
				{ status: 404 },
			)

		sendMail(
			deletedUser.email,
			`Your account on ${SITE_DATA.NAME} has been deleted`,
			`<p>Your account on ${SITE_DATA.NAME} has been deleted. If you think this is an error, please <a href="mailto:${process.env.EMAIL}">contact us</a>.</p>`,
		)

		return NextResponse.json(
			{ message: `${deletedUser.fullName} has been deleted!` },
			{ status: 200 },
		)
	} catch (err) {
		console.error(err)
		return NextResponse.json(
			{ message: "An error occurred" },
			{ status: 500 },
		)
	}
}
