export type Category = {
	_id: string
	name: string
	slug: string
	cover: string
}

export type NewCategoryFormData = Pick<Category, "name" | "slug" | "cover">

export type EditCategoryFormData = NewCategoryFormData
