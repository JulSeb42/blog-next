import dynamic from "next/dynamic"

export const UserHeader = dynamic(() => import("./user-header"))
