import { Schema, model, models } from "mongoose"
import type { Category } from "types"

if (models?.Category) {
	delete models.Category
}

const categorySchema = new Schema<Category>(
	{
		name: { type: String, unique: true },
		slug: { type: String, unique: true },
		cover: String,
	},
	{ timestamps: true },
)

export const CategoryModel = model<Category>("Category", categorySchema)
