import dynamic from "next/dynamic"

export const PostCard = dynamic(() => import("./post-card"))
export const PostCardSkeleton = dynamic(() => import("./post-card-skeleton"))
