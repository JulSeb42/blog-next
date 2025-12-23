"use client"
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
import {
	Pagination as Container,
	PaginationButton,
	clsx,
} from "@julseb-lib/react"
import type { IPagination } from "./types"

export default function Pagination({ page, totalPages }: IPagination) {
	const pathname = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams()

	const [currentPage, setCurrentPage] = useState(page)

	useEffect(() => {
		setCurrentPage(page)
	}, [page])

	const createPageURL = (pageNumber: number) => {
		const params = new URLSearchParams(searchParams)
		if (pageNumber === 1) {
			params.delete("page")
		} else {
			params.set("page", pageNumber.toString())
		}
		const queryString = params.toString()
		return queryString ? `${pathname}?${queryString}` : pathname
	}

	const handlePrev = () => {
		const newPage = currentPage - 1
		router.push(createPageURL(newPage))
	}

	const handleNext = () => {
		const newPage = currentPage + 1
		router.push(createPageURL(newPage))
	}

	const handlePage = (pageNumber: number) => {
		router.push(createPageURL(pageNumber))
	}

	const getPaginationGroup = () => {
		const start = Math.floor((currentPage! - 1) / 5) * 5

		return new Array(5)
			.fill(totalPages)
			.map((_, i) => start + i + 1)
			.filter(item => item <= (totalPages || 0))
	}

	const paginationGroup = getPaginationGroup()

	if (totalPages <= 1) return null

	return (
		<Container className={clsx("", "pagination")}>
			<PaginationButton
				onClick={handlePrev}
				isActive={false}
				disabled={currentPage === 1}
			>
				<BiLeftArrowAlt size={24} />
			</PaginationButton>

			{paginationGroup[0] !== 1 && (
				<>
					<PaginationButton
						isActive={currentPage === 1}
						onClick={() => handlePage(1)}
					>
						1
					</PaginationButton>

					<PaginationButton readOnly>...</PaginationButton>
				</>
			)}

			{paginationGroup.map(n => (
				<PaginationButton
					isActive={n === currentPage}
					onClick={() => handlePage(n)}
					key={n}
				>
					{n}
				</PaginationButton>
			))}

			{paginationGroup[paginationGroup.length - 1] !== totalPages && (
				<>
					<PaginationButton readOnly>...</PaginationButton>

					<PaginationButton
						isActive={currentPage === totalPages}
						onClick={() => handlePage(totalPages)}
					>
						{totalPages}
					</PaginationButton>
				</>
			)}

			<PaginationButton
				onClick={handleNext}
				isActive={false}
				disabled={currentPage === totalPages}
			>
				<BiRightArrowAlt size={24} />
			</PaginationButton>
		</Container>
	)
}
