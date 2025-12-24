import type { Comment } from "types"

export interface ICommentCard {
	comment: Comment
	setComments: DispatchState<Array<Comment>>
}
