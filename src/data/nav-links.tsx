import { BiLayout, BiLinkExternal, BiUser, BiUserCircle } from "react-icons/bi"
import type { PageType } from "types"

export type NavLink = {
	title: string
	href: string
	type: PageType
}

export const navLinks: Array<NavLink> = [
	{ title: "Homepage", href: "/", type: "all" },
	{ title: "Users", href: "/users", type: "all" },
	{ title: "Signup", href: "/signup", type: "anon" },
	{ title: "Login", href: "/login", type: "anon" },
	{ title: "My account", href: "/my-account", type: "protected" },
	{ title: "Admin", href: "/admin", type: "admin" },
]

type AdminNavLink = Omit<NavLink, "type"> & {
	icon: ReactElement
}

export const adminNavLinks: Array<AdminNavLink> = [
	{ title: "Admin", href: "/admin", icon: <BiLayout /> },
	{ title: "Users", href: "/admin/users", icon: <BiUser /> },
]

export const adminNavBottomLinks: Array<AdminNavLink> = [
	{
		title: "My account",
		href: "/admin/my-account",
		icon: <BiUserCircle />,
	},
	{ title: "Back to site", href: "/", icon: <BiLinkExternal /> },
]
