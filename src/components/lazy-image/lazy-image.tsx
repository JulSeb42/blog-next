"use client"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Skeleton, clsx } from "@julseb-lib/react"
import type { ILazyImage } from "./types"

const Image = dynamic(() => import("next/image"))

export default function LazyImage({
	ref,
	skeletonAnimation,
	skeletonClasses,
	...rest
}: ILazyImage) {
	return (
		<Suspense
			fallback={
				<Skeleton
					animation={skeletonAnimation}
					className={clsx(skeletonClasses)}
				/>
			}
		>
			<Image ref={ref} {...rest} />
		</Suspense>
	)
}
