import bcrypt from "bcryptjs"
import { getRandomAvatar, getRandomString } from "@julseb-lib/utils"
import { UserModel } from "models"
import { COMMON_TEXTS } from "data"
import { SALT_ROUNDS } from "utils"
import { connectDb } from "./db"
import { sendMail } from "./send-mail"
import type { RegisterUserFormData, AuthenticateUserFormData } from "types"

export async function registerUser(data: RegisterUserFormData) {
	await connectDb()

	const { email, password } = data

	const foundUser = await UserModel.findOne({ email })

	if (foundUser) throw new Error(COMMON_TEXTS.ERRORS.EMAIL_TAKEN)

	const salt = bcrypt.genSaltSync(SALT_ROUNDS)
	const hashedPassword = bcrypt.hashSync(password, salt)

	const verifyToken = getRandomString()

	const user = await UserModel.create({
		...data,
		email,
		password: hashedPassword,
		role: "user",
		avatar: getRandomAvatar(),
		verified: false,
		verifyToken,
	})

	sendMail(
		email,
		COMMON_TEXTS.EMAIL_SIGNUP_TITLE,
		COMMON_TEXTS.EMAIL_SIGNUP_BODY(user, verifyToken),
	)

	return user
}

export async function authenticateUser(data: AuthenticateUserFormData) {
	await connectDb()

	const { email, password } = data

	const user = await UserModel.findOne({ email })
	if (!user) return COMMON_TEXTS.ERRORS.USER_NOT_EXIST

	const valid = await bcrypt.compare(password, user.password)
	if (!valid) return COMMON_TEXTS.ERRORS.WRONG_PASSWORD

	return user
}
