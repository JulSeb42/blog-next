"use client"
import { useState, useEffect } from "react"
import {
	Button,
	Text,
	Modal,
	Form,
	Input,
	slugify,
	disableScroll,
	enableScroll,
	toast,
} from "@julseb-lib/react"
import { AdminIsland, ImageUploader, ErrorMessage } from "components"
import { categoryService } from "api"
import { useModalOpen } from "context"
import type { LibValidationStatus } from "@julseb-lib/react/types"
import type { Category, IErrorMessage } from "types"

type Validation = {
	name: LibValidationStatus
	cover: LibValidationStatus
}

export function NewCategory({ setCategories }: INewCategory) {
	const { setHasModalOpen } = useModalOpen()

	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (isOpen) {
			setHasModalOpen(true)
			disableScroll()
		} else {
			setHasModalOpen(false)
			enableScroll()
		}
	}, [isOpen])

	const [name, setName] = useState("")
	const [cover, setCover] = useState("")
	const [isUploading, setIsUploading] = useState(false)
	const [validation, setValidation] = useState<Validation>({
		name: undefined,
		cover: undefined,
	})
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		setErrorMessage(undefined)
		setValidation({ name: undefined, cover: undefined })

		if (!name.length || !cover.length) {
			setValidation({
				name: !name.length ? false : undefined,
				cover: !cover.length ? false : undefined,
			})
			return
		}

		setIsLoading(true)

		return categoryService
			.newCategory({ name, cover, slug: slugify(name) })
			.then(res => {
				setCategories(prev => [...prev, res.data])
				setIsOpen(false)
				toast.success(`Category ${res.data.name} has been added!`)
			})
			.catch(err => setErrorMessage(err?.response?.data?.message))
			.finally(() => setIsLoading(false))
	}

	return (
		<>
			<AdminIsland className="flex md:flex-row flex-col justify-between items-start! md:items-center gap-2">
				<Text tag="h1">Categories</Text>
				<Button
					className="md:self-center"
					onClick={() => setIsOpen(true)}
				>
					New category
				</Button>
			</AdminIsland>

			<Modal isOpen={isOpen} setIsOpen={setIsOpen} hideCloseButton>
				<Form
					buttonPrimary="Add new category"
					buttonSecondary={{
						content: "Cancel",
						onClick: () => setIsOpen(false),
					}}
					isLoading={isLoading || isUploading}
					onSubmit={handleSubmit}
					className="bg-background p-4 rounded-lg w-full max-w-108"
				>
					<Text tag="h4">Add a new category</Text>

					<Input
						id="name"
						label="Name"
						value={name}
						onChange={e => setName(e.target.value)}
						validation={{
							status: validation.name,
							message: "Name is required",
						}}
					/>

					<ImageUploader
						id="cover"
						label="Cover"
						image={cover}
						setImage={setCover}
						isUploading={isUploading}
						setIsUploading={setIsUploading}
						validation={{
							status: validation.cover,
							message: "Cover is required",
						}}
					/>
					<ErrorMessage>{errorMessage}</ErrorMessage>
				</Form>
			</Modal>
		</>
	)
}

interface INewCategory {
	setCategories: DispatchState<Array<Category>>
}
