"use client"
import { redirect, usePathname } from "next/navigation"
import Link from "next/link"
import { BiSun, BiMoon, BiPowerOff } from "react-icons/bi"
import { Flexbox, Tooltip, clsx, useLibTheme } from "@julseb-lib/react"
import { adminNavLinks, adminNavBottomLinks } from "data"
import { useAuth } from "context"

const LINKS_COMMON = [
	"flex items-center gap-1 px-4 py-1 focus:ring-0 text-left w-full rounded-none justify-start text-primary-500 hover:text-primary-300",
	"[&.active-page]:bg-primary-300 [&.active-page]:text-primary-600 [&.active-page]:hover:bg-primary-200 hover:text-primary-300!",
]

export function AdminNav() {
	const pathname = usePathname()
	const { theme, switchTheme } = useLibTheme()
	const { logout } = useAuth()

	return (
		<>
			<nav
				className={clsx(
					"fixed z-40 flex flex-col justify-between py-6 h-calc(100svh-4px) bg-background rounded-xl border border-gray-200 left-1 top-1 h-[calc(100svh-16px)]",
					"[&_svg]:size-6",
					"admin-nav",
				)}
			>
				<Flexbox flexDirection="col" element="section">
					{adminNavLinks.map((link, i) => (
						<Tooltip
							tooltip={link.title}
							position="right"
							tooltipClasses="translate-x-6"
							key={i}
						>
							<Link
								href={link.href}
								className={clsx(
									LINKS_COMMON,
									"flex justify-center items-center px-2 py-1",
									pathname === link.href && "active-page",
								)}
							>
								{link.icon}
							</Link>
						</Tooltip>
					))}
				</Flexbox>

				<Flexbox flexDirection="col" element="section">
					{adminNavBottomLinks.map((link, i) => (
						<Tooltip
							tooltip={link.title}
							position="right"
							tooltipClasses="translate-x-12"
							key={i}
						>
							<Link
								href={link.href}
								className={clsx(
									LINKS_COMMON,
									"flex justify-center items-center px-2 py-1",
									pathname === link.href && "active-page",
								)}
							>
								{link.icon}
							</Link>
						</Tooltip>
					))}

					<Tooltip
						tooltip="Logout"
						position="right"
						tooltipClasses="translate-x-6"
					>
						<button
							onClick={() => {
								logout()
								redirect("/login")
							}}
							className={clsx(
								LINKS_COMMON,
								"flex justify-center items-center px-2 py-1",
							)}
						>
							<BiPowerOff />
						</button>
					</Tooltip>

					<Tooltip
						tooltip="Switch theme"
						position="right"
						tooltipClasses="translate-x-16"
					>
						<button
							onClick={switchTheme}
							className={clsx(
								LINKS_COMMON,
								"flex justify-center items-center px-2 py-1",
							)}
						>
							{theme === "dark" ? <BiSun /> : <BiMoon />}
						</button>
					</Tooltip>

					{/* <Button
						className={clsx(LINKS_COMMON)}
						onClick={() => {
							logout()
							redirect("/login")
						}}
						variant="transparent"
						color={theme === "dark" ? "white" : "primary"}
					>
						<BiPowerOff />
						{isOpen && "Logout"}
					</Button>

					<Button
						className={clsx(LINKS_COMMON)}
						onClick={switchTheme}
						variant="transparent"
						color={theme === "dark" ? "white" : "primary"}
					>
						{theme === "dark" ? <BiSun /> : <BiMoon />}
						{isOpen && "Switch theme"}
					</Button> */}
				</Flexbox>
			</nav>
		</>
	)
}
