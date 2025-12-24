import dynamic from "next/dynamic"

export const AuthorCard = dynamic(() => import("./author-card"))
