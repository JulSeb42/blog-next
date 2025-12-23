export const pageType = {
	all: "all",
	anon: "anon",
	protected: "protected",
	admin: "admin",
} as const

export type PageType = keyof typeof pageType
