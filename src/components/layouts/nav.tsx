"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BiSun, BiMoon } from "react-icons/bi"
import { useLibTheme, ButtonIcon, clsx } from "@julseb-lib/react"
import { useAuth } from "context"
import { navLinks } from "data"

export function Nav() {
	const pathname = usePathname()
	const { theme, switchTheme } = useLibTheme()
	const { isLoggedIn, user, logout } = useAuth()

	const links = navLinks.filter(link =>
		isLoggedIn && user?.role === "user"
			? link.type === "protected" || link.type === "all"
			: isLoggedIn && user?.role === "admin"
				? link.type === "admin" || link.type === "all"
				: link.type === "anon" || link.type === "all",
	)

	return (
		<>
			{links.map((link, i) => (
				<Link
					href={link.href}
					className={clsx(
						pathname === "/" && link.href === "/"
							? "active"
							: link.href !== "/" &&
									pathname.includes(link.href) &&
									"active",
					)}
					key={i}
				>
					{link.title}
				</Link>
			))}

			{isLoggedIn && (
				<button onClick={logout} className="text-left">
					Logout
				</button>
			)}

			<ButtonIcon
				icon={theme === "dark" ? <BiSun /> : <BiMoon />}
				onClick={switchTheme}
				className="focus:ring-0 size-6"
				variant="transparent"
				color="white"
			/>
		</>
	)
}
