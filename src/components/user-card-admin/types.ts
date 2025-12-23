import type { User } from "types"

export interface IUserCardAdmin {
	user: User
	setUsers: DispatchState<Array<User>>
}
