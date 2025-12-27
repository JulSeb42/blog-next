"use client"
import { Fragment, useState, useEffect } from "react"
import { BiEdit, BiTrash } from "react-icons/bi"
import {
	Input,
	Hr,
	Flexbox,
	Text,
	ButtonIcon,
	Modal,
	Form,
	Alert,
	Button,
	disableScroll,
	enableScroll,
	slugify,
	toast,
} from "@julseb-lib/react"
import { AdminIsland, ErrorMessage, ImageUploader } from "components"
import { NewCategory } from "./new-category"
import { useModalOpen } from "context"
import { categoryService } from "api"
import type { LibValidationStatus } from "@julseb-lib/react/types"
import type { Category, IErrorMessage } from "types"

export function CategoriesList({
	categories: initialCategories,
}: ICategoriesList) {
	const [categories, setCategories] = useState(initialCategories)

	const [search, setSearch] = useState("")

	const filteredCategories = categories.filter(category =>
		category.name.toLowerCase().includes(search.toLowerCase()),
	)

	return (
		<>
			<NewCategory setCategories={setCategories} />

			<AdminIsland className="grid grid-cols-2">
				<Input
					id="search"
					type="search"
					label="Search category"
					value={search}
					onChange={e => setSearch(e.target.value)}
					clearSearch={() => setSearch("")}
				/>
			</AdminIsland>

			<AdminIsland className="flex flex-col gap-4">
				{!categories.length ? (
					<Text>No category yet.</Text>
				) : filteredCategories.length ? (
					filteredCategories.map((category, i) => (
						<Fragment key={category._id}>
							<CategoryLine
								category={category}
								setCategories={setCategories}
							/>

							{i !== filteredCategories.length - 1 && <Hr />}
						</Fragment>
					))
				) : (
					<Text>Your search did not return any result.</Text>
				)}
			</AdminIsland>
		</>
	)
}

interface ICategoriesList {
	categories: Array<Category>
}

function CategoryLine({ category, setCategories }: ICategoryLine) {
	const { setHasModalOpen } = useModalOpen()

	const [isEditOpen, setIsEditOpen] = useState(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)

	useEffect(() => {
		if (isEditOpen || isDeleteOpen) {
			setHasModalOpen(true)
			disableScroll()
		} else {
			setHasModalOpen(false)
			enableScroll()
		}
	}, [isEditOpen, isDeleteOpen])

	const [name, setName] = useState(category.name)
	const [cover, setCover] = useState(category.cover)
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
			.editCategory(category._id, {
				name,
				cover,
				slug: slugify(name),
			})
			.then(res => {
				setCategories(prev => [
					...prev.filter(c => c._id !== category._id),
					res.data,
				])
				toast.success(`Category ${res.data.name} has been edited!`)
				setIsEditOpen(false)
				enableScroll()
				setHasModalOpen(false)
			})
			.catch(err => {
				console.error(err)
				setErrorMessage(err?.response?.data?.message)
			})
			.finally(() => setIsLoading(false))
	}

	const handleDelete = () => {
		categoryService
			.deleteCategory(category._id)
			.then(() => {
				setCategories(prev => prev.filter(c => c._id !== category._id))
				toast.success(`Category ${category.name} has been deleted.`)
			})
			.catch(err => {
				console.error(err)
				toast.error("An error occurred")
			})
			.finally(() => {
				setIsDeleteOpen(false)
				enableScroll()
				setHasModalOpen(false)
			})
	}

	return (
		<>
			<Flexbox justifyContent="space-between" gap="xs">
				<Text>{category.name}</Text>

				<Flexbox gap="xs">
					<ButtonIcon
						icon={<BiEdit />}
						variant="ghost"
						onClick={() => setIsEditOpen(true)}
						className="size-6"
					/>

					<ButtonIcon
						icon={<BiTrash />}
						variant="ghost"
						color="danger"
						onClick={() => setIsDeleteOpen(true)}
						className="size-6"
					/>
				</Flexbox>
			</Flexbox>

			<Modal
				isOpen={isEditOpen}
				setIsOpen={setIsEditOpen}
				hideCloseButton
			>
				<Form
					buttonPrimary="Add new category"
					buttonSecondary={{
						content: "Cancel",
						onClick: () => setIsEditOpen(false),
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

			<Modal
				isOpen={isDeleteOpen}
				setIsOpen={setIsDeleteOpen}
				hideCloseButton
			>
				<Alert color="danger">
					<Text>
						Are you sure you want to delete {category.name}?
					</Text>
					<Flexbox gap="xs">
						<Button color="danger" onClick={handleDelete}>
							Yes, delete it
						</Button>
						<Button
							color="danger"
							variant="transparent"
							onClick={() => setIsDeleteOpen(false)}
						>
							No, cancel
						</Button>
					</Flexbox>
				</Alert>
			</Modal>
		</>
	)
}

interface ICategoryLine {
	category: Category
	setCategories: DispatchState<Array<Category>>
}

type Validation = {
	name: LibValidationStatus
	cover: LibValidationStatus
}
