import dynamic from "next/dynamic"

export const UserCardAdmin = dynamic(() => import("./user-card-admin"))
export const UserCardAdminSkeleton = dynamic(
	() => import("./user-card-admin-skeleton"),
)
