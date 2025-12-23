"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BiMoon, BiSun } from "react-icons/bi"
import { ButtonIcon, clsx, useLibTheme } from "@julseb-lib/react"
import { navLinks, SITE_DATA } from "data"
import { useAuth, useModalOpen } from "context"

export function Header() {
	const { hasModalOpen } = useModalOpen()

	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			if (typeof window !== "undefined") {
				if (window.scrollY > 1) setIsScrolled(true)
				else setIsScrolled(false)
			}
		}

		window.addEventListener("scroll", handleScroll)

		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<header
			className={clsx(
				"top-4 left-0 fixed flex items-center gap-4 bg-background px-[5%] py-4 rounded-2xl w-full transition-all duration-200 ease",
				hasModalOpen ? "z-0" : "z-50",
				isScrolled && "shadow-md",
			)}
		>
			<Link href="/" className="font-black text-h4 italic">
				{SITE_DATA.NAME}
			</Link>

			<Nav />
		</header>
	)
}

function Nav() {
	const pathname = usePathname()
	const { theme, switchTheme } = useLibTheme()
	const { isLoggedIn, logout } = useAuth()

	const links = navLinks.filter(link =>
		isLoggedIn
			? link.type === "protected" || link.type === "all"
			: link.type === "anon" || link.type === "all",
	)

	return (
		<>
			{links.map((link, i) => (
				<Link
					href={link.href}
					className={clsx(
						"text-font hover:text-primary-300 active:text-primary-600",
						"[&.active]:font-black",
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
				<button
					onClick={logout}
					className="hover:text-primary-300 active:text-primary-600 text-left"
				>
					Logout
				</button>
			)}

			<ButtonIcon
				icon={theme === "dark" ? <BiSun /> : <BiMoon />}
				onClick={switchTheme}
				className="focus:ring-0 size-6 text-font"
				variant="transparent"
			/>
		</>
	)
}
