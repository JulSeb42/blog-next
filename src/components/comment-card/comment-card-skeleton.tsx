"use client"
import { SkeletonCard, Skeleton, Flexbox } from "@julseb-lib/react"

export default function CommentCardSkeleton() {
	return (
		<SkeletonCard
			isShiny
			flexDirection="col"
			gap="xs"
			className="p-4 border border-gray-200 rounded-2xl"
		>
			<Flexbox gap="xs" alignItems="center">
				<Skeleton className="w-[30%] h-6" />
				<Skeleton className="w-[10%] h-5" />
			</Flexbox>

			<Skeleton className="w-[90%] h-6" />
			<Skeleton className="w-[70%] h-6" />
			<Skeleton className="w-[80%] h-6" />
		</SkeletonCard>
	)
}
