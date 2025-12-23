import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { passwordRegex } from "@julseb-lib/utils"
import { connectDb, verifyAccessToken, ServerCookies } from "lib/server"
import { UserModel } from "models"
import { COMMON_TEXTS } from "data"
import { SALT_ROUNDS } from "utils"

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		await connectDb()

		const { id } = await params

		if (!id) {
			return NextResponse.json(
				{ message: "User ID is required" },
				{ status: 400 },
			)
		}

		const token = await ServerCookies.getAuthToken()

		if (!token) {
			return NextResponse.json(
				{ message: "Authentication required" },
				{ status: 401 },
			)
		}

		let decodedToken

		try {
			decodedToken = verifyAccessToken(token) as any
		} catch {
			return NextResponse.json(
				{ message: "Invalid authentication token" },
				{ status: 401 },
			)
		}

		if (decodedToken.userId !== id) {
			return NextResponse.json(
				{ message: "Not authorized to edit this account" },
				{ status: 403 },
			)
		}

		const { oldPassword, newPassword } = await req.json()

		if (
			!oldPassword ||
			oldPassword.trim().length === 0 ||
			!newPassword ||
			newPassword.trim().length === 0
		) {
			return NextResponse.json(
				{ message: "Old and new passwords are required" },
				{ status: 400 },
			)
		}

		const user = await UserModel.findById(id)

		if (!user) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 },
			)
		}

		if (!(await bcrypt.compare(oldPassword, user.password))) {
			return NextResponse.json(
				{ message: COMMON_TEXTS.ERRORS.OLD_PASSWORD_WRONG },
				{ status: 400 },
			)
		}

		if (!passwordRegex.test(newPassword)) {
			return NextResponse.json(
				{
					message: COMMON_TEXTS.ERRORS.PASSWORD_NOT_VALID,
				},
				{ status: 400 },
			)
		}

		const salt = bcrypt.genSaltSync(SALT_ROUNDS)
		const hashedPassword = bcrypt.hashSync(newPassword, salt)

		const updatedUser = await UserModel.findByIdAndUpdate(
			id,
			{ password: hashedPassword },
			{ new: true, select: "-password -resetToken -verifyToken" },
		)

		if (!updatedUser) {
			return NextResponse.json(
				{ message: "Failed to update password" },
				{ status: 500 },
			)
		}

		return NextResponse.json(
			{ user: updatedUser, message: "Password updated!" },
			{ status: 201 },
		)
	} catch (err: any) {
		console.error("Edit password error: ", err)
		return NextResponse.json(
			{ message: "Failed to update password" },
			{ status: 500 },
		)
	}
}
