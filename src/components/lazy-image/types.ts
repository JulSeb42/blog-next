import type { LibSkeletonAnimation } from "@julseb-lib/react/types"
import type { ImageProps } from "next/image"

export interface ILazyImage extends ImageProps {
	ref?: RefObject<HTMLImageElement>
	skeletonAnimation?: LibSkeletonAnimation
	skeletonClasses?: ClassNames
}
