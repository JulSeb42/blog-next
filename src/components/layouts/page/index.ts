import dynamic from "next/dynamic"

export const Page = dynamic(() => import("./page"))
