import { NextResponse } from "next/server"
import { authenticateUser, signAccessToken, signRefreshToken } from "lib/server"
import { COMMON_TEXTS } from "data"

export async function POST(req: Request) {
	const { email, password } = await req.json()
	const user = await authenticateUser({ email, password })

	if (!user || typeof user === "string") {
		return NextResponse.json(
			{
				message:
					typeof user === "string"
						? user
						: COMMON_TEXTS.ERRORS.USER_NOT_EXIST,
			},
			{ status: 400 },
		)
	}

	const access = signAccessToken({ userId: user._id })
	const refresh = signRefreshToken({ userId: user._id })

	const res = NextResponse.json({ success: true }, { status: 201 })

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
}
