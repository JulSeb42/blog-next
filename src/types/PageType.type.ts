export const pageType = {
	all: "all",
	anon: "anon",
	protected: "protected",
} as const

export type PageType = keyof typeof pageType
