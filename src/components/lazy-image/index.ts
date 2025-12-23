import dynamic from "next/dynamic"

export const LazyImage = dynamic(() => import("./lazy-image"))
