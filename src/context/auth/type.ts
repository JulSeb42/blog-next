import type { User } from "types"

export interface IAuthContext {
	user: User
	setUser: DispatchState<User>
	loading: boolean
	setLoading: DispatchState<boolean>
	isLoggedIn: boolean
	logout: () => void
	refetch: () => void
}
