"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BiMoon, BiSun } from "react-icons/bi"
import { ButtonIcon, Burger, clsx, useLibTheme } from "@julseb-lib/react"
import { navLinks, SITE_DATA } from "data"
import { useAuth, useModalOpen } from "context"

export function Header() {
	const pathname = usePathname()
	const { theme, switchTheme } = useLibTheme()
	const { isLoggedIn, logout } = useAuth()
	const { hasModalOpen } = useModalOpen()

	const [isScrolled, setIsScrolled] = useState(false)
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			if (typeof window !== "undefined") {
				if (window.scrollY > 10) setIsScrolled(true)
				else setIsScrolled(false)
			}
		}

		window.addEventListener("scroll", handleScroll)

		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const links = navLinks.filter(link =>
		isLoggedIn
			? link.type === "protected" || link.type === "all"
			: link.type === "anon" || link.type === "all",
	)

	return (
		<>
			<header
				className={clsx(
					"top-4 left-4 fixed flex items-center gap-4 bg-background px-[5%] py-4 rounded-2xl w-[calc(100%-32px)] transition-all duration-200 ease",
					hasModalOpen ? "z-0" : "z-50",
					(isScrolled || isOpen) && "shadow-md",
					"justify-between md:justify-start",
				)}
				role="navigation"
			>
				<Link href="/" className="font-black text-h4 italic">
					{SITE_DATA.NAME}
				</Link>

				<Burger
					isOpen={isOpen}
					onClick={() => setIsOpen(!isOpen)}
					className="md:hidden [&_span]:bg-font"
				/>

				<nav
					className={clsx(
						"flex items-center gap-4",
						"absolute md:relative bg-background shadow-md md:shadow-none! flex-col md:flex-row items-start md:items-center  px-4 py-2 md:px-0 md:py-0 rounded-2xl transition-all duration-200 ease h-[calc(100svh-68px-32px-12px)] md:h-[unset] top-20 md:top-[unset] w-50 md:w-[unset]",
						isOpen
							? "right-0 md:right-[unset]"
							: "-right-60 md:right-[unset]",
					)}
				>
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
				</nav>
			</header>

			{isOpen && (
				<div
					className="md:hidden top-0 left-0 z-40 fixed bg-overlay-black-50 w-full h-svh"
					onClick={() => setIsOpen(false)}
				/>
			)}
		</>
	)
}
