import dynamic from "next/dynamic"

export const CategoryCard = dynamic(() => import("./category-card"))
export const CategoryCardSkeleton = dynamic(
	() => import("./category-card-skeleton"),
)
