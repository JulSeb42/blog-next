import { SkeletonCard, Skeleton } from "@julseb-lib/react"

export default function UserCardAdminSkeleton() {
	return (
		<SkeletonCard
			className="relative rounded-xl w-full aspect-square"
			isShiny
		>
			<Skeleton className="size-full" />
		</SkeletonCard>
	)
}
