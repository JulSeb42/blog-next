import dynamic from "next/dynamic"

export const UserCard = dynamic(() => import("./user-card"))
export const UserCardSkeleton = dynamic(() => import("./user-card-skeleton"))
