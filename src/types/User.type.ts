export const userRoles = { user: "user", admin: "admin" } as const

export type UserRole = keyof typeof userRoles

export type User = {
	_id: string
	fullName: string
	email: string
	password: string
	avatar: string
	role: UserRole
	verified: boolean
	verifyToken: string
	resetToken?: string
}

export type InfinitePagination = {
	currentPage: number
	totalPages: number
	totalUsers: number
	hasMore: boolean
	limit: number
}

export type ResponseInfiniteUsers = {
	users: Array<User>
	pagination: InfinitePagination
}

export type EditAccountFormData = Pick<User, "fullName" | "avatar">

export type EditPasswordFormData = {
	oldPassword: string
	newPassword: string
}
