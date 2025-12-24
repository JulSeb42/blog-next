"use client"
import Link from "next/link"
import { clsx, Text } from "@julseb-lib/react"
import { LazyImage } from "components/lazy-image"
import type { ICategoryCard } from "./types"

export default function CategoryCard({ category }: ICategoryCard) {
	return (
		<Link
			href={`/categories/${category.slug}`}
			className={clsx(
				"relative flex items-end p-4 rounded-2xl w-full h-50 overflow-hidden",
				"hover:[&_img]:scale-105",
				"category-card",
			)}
		>
			<LazyImage
				src={category.cover}
				alt={`Cover ${category.name}`}
				width={500}
				height={500}
				className="top-0 left-0 absolute size-full object-cover transition-all duration-200 ease"
			/>

			<Text
				tag="h5"
				className="z-10 relative bg-background p-2 rounded-xl w-fit"
			>
				{category.name}
			</Text>
		</Link>
	)
}
