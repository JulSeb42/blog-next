import dynamic from "next/dynamic"

export const ErrorMessage = dynamic(() => import("./error-message"))
