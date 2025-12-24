import dynamic from "next/dynamic"

export const CommentCard = dynamic(() => import("./comment-card"))
export const CommentCardSkeleton = dynamic(
	() => import("./comment-card-skeleton"),
)
