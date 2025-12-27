"use client"
import { useState, useEffect } from "react"
import { redirect } from "next/navigation"
import {
	Form,
	Input,
	MarkdownEditor,
	InputCheck,
	slugify,
	toast,
} from "@julseb-lib/react"
import { ErrorMessage } from "./error-message"
import { ImageUploader } from "./image-uploader"
import { AdminIsland } from "./admin-island"
import { categoryService, postService } from "api"
import { useAuth } from "context"
import type { LibValidationStatus } from "@julseb-lib/react/types"
import type { Category, IErrorMessage, Post } from "types"

type Validation = {
	title: LibValidationStatus
	slug: LibValidationStatus
	cover: LibValidationStatus
	coverAlt: LibValidationStatus
	body: LibValidationStatus
	category: LibValidationStatus
	tags: LibValidationStatus
	metaDescription: LibValidationStatus
	keywords: LibValidationStatus
}

export function PostForm({ post }: IPostForm) {
	const { user } = useAuth()

	const [categories, setCategories] = useState<Array<Category>>([])
	const [categoryLoading, setCategoryLoading] = useState(true)
	const [categoryError, setCategoryError] = useState<IErrorMessage>(undefined)

	useEffect(() => {
		if (categoryLoading)
			categoryService
				.allCategories()
				.then(res => setCategories(res.data))
				.catch(err => setCategoryError(err?.response?.data?.message))
				.finally(() => setCategoryLoading(false))
	}, [categoryLoading])

	const [inputs, setInputs] = useState({
		title: post?.title ?? "",
		coverAlt: post?.coverAlt ?? "",
		category: post?.category ?? "none",
		tags: post?.tags.join(",") ?? "",
		metaDescription: post?.metaDescription ?? "",
		keywords: post?.keywords.join(",") ?? "",
	})
	const [slug, setSlug] = useState(post?.slug ?? "")
	const [cover, setCover] = useState(post?.cover ?? "")
	const [isUploading, setIsUploading] = useState(false)
	const [featured, setFeatured] = useState(false)
	const [body, setBody] = useState(post?.body ?? "")
	const [draft, setDraft] = useState(post?.draft ?? true)
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)
	const [validation, setValidation] = useState<Validation>({
		title: undefined,
		slug: undefined,
		cover: undefined,
		coverAlt: undefined,
		body: undefined,
		category: undefined,
		tags: undefined,
		metaDescription: undefined,
		keywords: undefined,
	})

	const handleInputs = (
		e: ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => setInputs({ ...inputs, [e.target.id]: e.target.value })

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		setValidation({
			title: undefined,
			slug: undefined,
			cover: undefined,
			coverAlt: undefined,
			body: undefined,
			category: undefined,
			tags: undefined,
			metaDescription: undefined,
			keywords: undefined,
		})
		setErrorMessage(undefined)

		if (
			!inputs.title.length ||
			((inputs.category === "none" ||
				!cover.length ||
				!inputs.coverAlt.length ||
				!inputs.tags.length ||
				!inputs.metaDescription.length ||
				!inputs.keywords.length ||
				!slug.length ||
				!body.length) &&
				!draft)
		) {
			setValidation({
				title: !inputs.title.length ? false : undefined,
				slug: !slug.length ? false : undefined,
				cover: !cover.length ? false : undefined,
				coverAlt: !inputs.coverAlt.length ? false : undefined,
				body: !body.length ? false : undefined,
				category: inputs.category === "none" ? false : undefined,
				tags: !inputs.tags.length ? false : undefined,
				metaDescription: !inputs.metaDescription.length
					? false
					: undefined,
				keywords: !inputs.keywords.length ? false : undefined,
			})
			return
		}

		setIsLoading(true)

		const requestBody = {
			...inputs,
			category: inputs.category as any,
			keywords: (inputs.keywords as string).split(","),
			tags: (inputs.tags as string).split(","),
			slug,
			cover,
			featured,
			body,
			draft,
		}

		if (post) {
			return postService
				.editPost(post._id, requestBody)
				.then(res =>
					toast.success(`${res.data.title} has been edited!`),
				)
				.then(() => setTimeout(() => redirect("/admin"), 200))
				.catch(err => {
					console.error(err)
					setErrorMessage(err?.response?.data?.message)
				})
				.finally(() => setIsLoading(false))
		}

		return postService
			.newPost({ ...requestBody, author: user._id as any })
			.then(() => toast.success("Post has been created"))
			.then(() => setTimeout(() => redirect("/admin"), 200))
			.catch(err => {
				console.error(err)
				setErrorMessage(err?.response?.data?.message)
			})
			.finally(() => setIsLoading(false))
	}

	return (
		<>
			<AdminIsland className="flex flex-col">
				<Form
					buttonPrimary={post ? "Save changes" : "Create new post"}
					buttonSecondary={{
						content: "Cancel",
						onClick: () => redirect("/admin"),
					}}
					isLoading={isLoading}
					onSubmit={handleSubmit}
				>
					<Input
						id="title"
						label="Title"
						value={inputs.title}
						onChange={e => {
							handleInputs(e)
							setSlug(slugify(e.target.value))
						}}
						validation={{
							status: validation.title,
							message: "Title is required",
						}}
					/>

					<Input
						id="slug"
						label="Slug"
						value={slug}
						onChange={e => setSlug(e.target.value)}
						validation={{
							status: validation.slug,
							message: "Slug is required",
						}}
					/>

					<Input
						id="category"
						label="Category"
						value={inputs.category}
						onChange={handleInputs}
						type="select"
						validation={{
							status: validation.category,
							message: "Category is required",
						}}
					>
						<option value="none">None</option>
						{categories.map(category => (
							<option key={category._id} value={category._id}>
								{category.name}
							</option>
						))}
					</Input>

					{categoryError && (
						<ErrorMessage>
							Error while loading categories:{" "}
							{categoryError as string}
						</ErrorMessage>
					)}

					<MarkdownEditor
						label="Body"
						value={body}
						setValue={setBody}
						validation={{
							status: validation.body,
							message: "Body is required",
						}}
					/>

					<ImageUploader
						id="cover"
						image={cover}
						setImage={setCover}
						isUploading={isUploading}
						setIsUploading={setIsUploading}
						label="Cover"
						validation={{
							status: validation.cover,
							message: "Cover is required",
						}}
						inputClassName="w-full aspect-video h-[unset]"
						deleteButtonClassName="left-[unset] right-0 translate-x-[50%]"
					/>

					<Input
						id="coverAlt"
						label="Cover alt"
						value={inputs.coverAlt}
						onChange={handleInputs}
						validation={{
							status: validation.coverAlt,
							message: "Cover alt is required",
						}}
					/>

					<Input
						id="tags"
						label="Tags"
						helperBottom="Separate all tags by a comma"
						value={inputs.tags}
						onChange={handleInputs}
						validation={{
							status: validation.tags,
							message: "Tags are required",
						}}
					/>

					<Input
						id="metaDescription"
						label="Meta description"
						value={inputs.metaDescription}
						onChange={handleInputs}
						type="textarea"
						validation={{
							status: validation.metaDescription,
							message: "Meta description is required",
						}}
					/>

					<Input
						id="keywords"
						label="Keywords"
						helperBottom="Separate all keywords by a comma"
						value={inputs.keywords}
						onChange={handleInputs}
						validation={{
							status: validation.keywords,
							message: "Keywords are required",
						}}
					/>

					<InputCheck
						id="featured"
						checked={featured}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setFeatured(e.target.checked)
						}
						type="checkbox"
						variant="toggle"
					>
						Set post as featured?
					</InputCheck>

					<InputCheck
						id="draft"
						checked={draft}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setDraft(e.target.checked)
						}
						type="checkbox"
						variant="toggle"
					>
						Add as draft?
					</InputCheck>
				</Form>
			</AdminIsland>

			<ErrorMessage>{errorMessage}</ErrorMessage>
		</>
	)
}

interface IPostForm {
	post?: Post
}
