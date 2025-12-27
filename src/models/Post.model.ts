import { Schema, model, models } from "mongoose"
import type { Post } from "types"

if (models?.Post) {
	delete models.Post
}

const postSchema = new Schema<Post>(
	{
		title: String,
		slug: { type: String, unique: true },
		cover: String,
		coverAlt: String,
		featured: Boolean,
		body: String,
		tags: Array,
		draft: Boolean,
		metaDescription: String,
		keywords: Array,
		author: { type: Schema.Types.ObjectId, ref: "User" },
		category: { type: Schema.Types.ObjectId, ref: "Category" },
	},
	{ timestamps: true },
)

export const PostModel = model<Post>("Post", postSchema)
