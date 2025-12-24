import { SkeletonCard, Skeleton, Flexbox, clsx } from "@julseb-lib/react"

export default function PostCardSkeleton() {
	return (
		<SkeletonCard
			isShiny
			className={clsx(
				"flex justify-between p-6 border border-gray-200 rounded-2xl w-full",
			)}
			alignItems="end"
		>
			<Flexbox flexDirection="col" gap="xs" className="w-full">
				<Skeleton className="w-40 h-5.25" />

				<Flexbox gap="xs">
					<Skeleton className="rounded-full w-16 h-6" />
					<Skeleton className="rounded-full w-16 h-6" />
					<Skeleton className="rounded-full w-16 h-6" />
				</Flexbox>

				<Skeleton className="w-[70%] h-9" />
				<Skeleton className="w-[90%] h-6" />
				<Skeleton className="w-[70%] h-6" />
			</Flexbox>

			<Flexbox className="w-1/4">
				<Skeleton className="rounded-xl w-full h-25" />
			</Flexbox>
		</SkeletonCard>
	)
}
