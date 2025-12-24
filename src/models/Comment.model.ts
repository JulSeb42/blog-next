import { Schema, model, models } from "mongoose"
import type { Comment } from "types"

if (models?.Comment) {
	delete models.Comment
}

const commentSchema = new Schema<Comment>(
	{
		author: String,
		body: String,
		post: { type: Schema.Types.ObjectId, ref: "Post" },
	},
	{ timestamps: true },
)

export const CommentModel = model<Comment>("Comment", commentSchema)
