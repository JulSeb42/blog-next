import type { ServerPagination } from "./ServerPagination.type"

export const userRoles = {
	writer: "writer",
	moderator: "moderator",
	admin: "admin",
} as const

export type UserRole = keyof typeof userRoles

export type User = {
	_id: string
	fullName: string
	slug: string
	bio: string
	email: string
	password: string
	avatar: string
	role: UserRole
	verified: boolean
	verifyToken: string
	resetToken?: string
}

export type ResponseInfiniteUsers = {
	users: Array<User>
	pagination: ServerPagination
}

export type EditAccountFormData = Pick<User, "fullName" | "avatar">

export type EditPasswordFormData = {
	oldPassword: string
	newPassword: string
}
