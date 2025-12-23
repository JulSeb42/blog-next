import { NextResponse } from "next/server"
import { verifyRefreshToken, signAccessToken } from "lib/server"

export async function POST(req: Request) {
	try {
		const { refresh } = await req.json()

		const token = refresh
		const decoded = verifyRefreshToken(token) as any
		const newAccess = signAccessToken({ userId: decoded.userId })

		const res = NextResponse.json({ success: true })

		res.cookies.set("access_token", newAccess, {
			httpOnly: true,
			path: "/",
			maxAge: 60 * 60 * 24 * 30,
		})

		res.cookies.set("auth_status", "authenticated", {
			httpOnly: false,
			path: "/",
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24 * 30,
		})

		return res
	} catch {
		return NextResponse.json(
			{ error: "Invalid refresh token" },
			{ status: 403 },
		)
	}
}
