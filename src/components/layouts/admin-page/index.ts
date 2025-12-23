import dynamic from "next/dynamic"

export const AdminPage = dynamic(() => import("./admin-page"))
