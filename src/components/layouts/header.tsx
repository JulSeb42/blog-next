"use client"
import Link from "next/link"
import { Header as Container, clsx } from "@julseb-lib/react"
import { SITE_DATA } from "data"
import { useModalOpen } from "context"
import { Nav } from "./nav"

export function Header() {
	const { hasModalOpen } = useModalOpen()

	return (
		<Container
			logo={<Link href="/">{SITE_DATA.NAME}</Link>}
			nav={<Nav />}
			position="absolute"
			className={clsx(
				"md:[&_.header-burger]:hidden! md:[&_nav]:relative md:[&_nav]:flex-row [&_nav]:flex-col [&_nav]:w-[70%] md:[&_nav]:w-fit",
				hasModalOpen ? "z-10" : "z-20",
			)}
		/>
	)
}
