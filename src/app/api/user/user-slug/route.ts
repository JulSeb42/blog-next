import { NextResponse } from "next/server"
import { connectDb } from "lib/server"
import { UserModel } from "models"

export async function GET(req: Request) {
	await connectDb()

	try {
		
	} catch(err) {
		console.error(err)
		return NextResponse.json(
			{ message: "An error occurred" },
			{ status: 500 },
		)
	}
}
