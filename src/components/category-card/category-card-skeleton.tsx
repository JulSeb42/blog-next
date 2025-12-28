"use client"
import { SkeletonCard, Skeleton } from "@julseb-lib/react"

export default function CategoryCardSkeleton() {
	return (
		<SkeletonCard
			isShiny
			className="flex items-end bg-gray-200 p-4 rounded-2xl w-full h-50"
		>
			<Skeleton className="bg-gray-300 w-[70%] h-12" />
		</SkeletonCard>
	)
}
