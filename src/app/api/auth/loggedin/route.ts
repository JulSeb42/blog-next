import { NextResponse } from "next/server"
import { verifyAccessToken, connectDb, ServerCookies } from "lib/server"
import { UserModel } from "models"

export async function GET() {
	try {
		const token = await ServerCookies.getAuthToken()

		if (!token) {
			return NextResponse.json({ loggedIn: false, message: "No token" })
		}

		const decoded = verifyAccessToken(token) as any

		await connectDb()

		const user = await UserModel.findById(decoded.userId).select(
			"-password",
		)

		if (!user) {
			return NextResponse.json({
				loggedIn: false,
				message: "User not found.",
			})
		}

		return NextResponse.json({
			loggedIn: true,
			user: user.toObject ? user.toObject() : user,
		})
	} catch (err: any) {
		console.error("Auth check error:", err)
		return NextResponse.json({ loggedIn: false, error: err.message })
	}
}
