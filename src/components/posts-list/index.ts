import dynamic from "next/dynamic"

export const PostsList = dynamic(() => import("./posts-list"))
