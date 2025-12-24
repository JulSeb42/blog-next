import {
	BiCategory,
	BiLayout,
	BiLinkExternal,
	BiMessage,
	BiUser,
	BiUserCircle,
} from "react-icons/bi"
import type { PageType, UserRole } from "types"

export type NavLink = {
	title: string
	href: string
	type: PageType
}

export const navLinks: Array<NavLink> = [
	{ title: "Posts", href: "/", type: "all" },
	{ title: "Categories", href: "/categories", type: "all" },
	{ title: "Authors", href: "/authors", type: "all" },
	{ title: "Login", href: "/login", type: "anon" },
	{ title: "Admin", href: "/admin", type: "protected" },
]

type AdminNavLink = Omit<NavLink, "type"> & {
	icon: ReactElement
	role: UserRole
}

export const adminNavLinks: Array<AdminNavLink> = [
	{ title: "Posts", href: "/admin", icon: <BiLayout />, role: "writer" },
	{
		title: "Categories",
		href: "/admin/categories",
		icon: <BiCategory />,
		role: "writer",
	},
	{
		title: "Comments",
		href: "/admin/comments",
		icon: <BiMessage />,
		role: "moderator",
	},
	{ title: "Users", href: "/admin/users", icon: <BiUser />, role: "admin" },
]

export const adminNavBottomLinks: Array<AdminNavLink> = [
	{
		title: "My account",
		href: "/admin/my-account",
		icon: <BiUserCircle />,
		role: "writer",
	},
	{
		title: "Back to site",
		href: "/",
		icon: <BiLinkExternal />,
		role: "writer",
	},
]
