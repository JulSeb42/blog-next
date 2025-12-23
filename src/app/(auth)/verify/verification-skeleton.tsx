import { Flexbox, Skeleton } from "@julseb-lib/react"

export function VerificationSkeleton() {
	return (
		<Flexbox flexDirection="col" gap="sm">
			<Skeleton className="rounded-md w-full h-6" animation="shine" />
			<Skeleton className="rounded-md w-[80%] h-6" animation="shine" />
		</Flexbox>
	)
}
