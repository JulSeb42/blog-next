import type { User } from "./User.type"

export type RegisterUserFormData = Pick<User, "fullName" | "email" | "password">

export type AuthenticateUserFormData = Pick<User, "email" | "password">

export type VerifyUserFormData = Pick<User, "_id" | "verifyToken" | "verified">

export type ForgotPasswordFormData = Pick<User, "email">

export type ResetPasswordFormData = Pick<
	User,
	"password" | "resetToken" | "_id"
>
