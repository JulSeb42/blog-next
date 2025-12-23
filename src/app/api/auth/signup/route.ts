import { NextResponse } from "next/server"
import { registerUser, signAccessToken, signRefreshToken } from "lib/server"

export async function POST(req: Request) {
	try {
		const requestBody = await req.json()
		const user = await registerUser(requestBody)

		const access = signAccessToken({ userId: user._id })
		const refresh = signRefreshToken({ userId: user._id })

		const res = NextResponse.json(
			{ user: { email: user.email } },
			{ status: 201 },
		)

		res.cookies.set("access_token", access, {
			httpOnly: true,
			path: "/",
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24 * 30,
		})

		res.cookies.set("refresh_token", refresh, {
			httpOnly: true,
			path: "/",
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
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
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 })
	}
}
