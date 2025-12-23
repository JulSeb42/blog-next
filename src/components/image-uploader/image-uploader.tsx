"use client"
import { useState, useRef, type ChangeEvent } from "react"
import { BiX } from "react-icons/bi"
import {
	Modal,
	Alert,
	Text,
	Button,
	Flexbox,
	Loader,
	InputImage,
	clsx,
	toast,
} from "@julseb-lib/react"
import { cloudinaryService } from "api"
import type { IImageUploader } from "./types"

export default function ImageUploader({
	image,
	setImage,
	isUploading,
	setIsUploading,
	icons,
	inputClassName,
	id,
	deleteButtonClassName,
	uploaderClassName,
	...rest
}: IImageUploader) {
	const fileInputRef = useRef<HTMLInputElement>(null)

	const [isOpen, setIsOpen] = useState(false)

	const uploadToCloudinary = async (file: File): Promise<string | null> => {
		setIsUploading(true)

		const formData = new FormData()
		formData.append("image", file, file.name)

		return cloudinaryService
			.uploadImage(formData)
			.then(res => res.image_url)
			.catch(err => {
				console.error("❌ Cloudinary upload failed: ", err)
				toast.error("Failed to upload image")
				return null
			})
			.finally(() => setIsUploading(false))
	}

	const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (!file) return

		if (!file.type.startsWith("image/")) {
			toast.error("Please select an image file")
			return
		}

		if (file.size > 5 * 1024 * 1024) {
			toast.error("Image size should be less than 5MB")
			return
		}

		const reader = new FileReader()
		reader.onload = e => {
			const result = e.target?.result as string
			setImage(result)
		}
		reader.readAsDataURL(file)

		const cloudinaryUrl = await uploadToCloudinary(file)
		if (cloudinaryUrl) {
			setImage(cloudinaryUrl)
			toast.success("Image uploaded successfully!")
		} else {
			setImage(null as any)
			if (fileInputRef.current) {
				fileInputRef.current.value = ""
			}
		}
	}

	const removeImage = () => {
		setImage(null as any)
		setIsUploading(false)
		if (fileInputRef.current) {
			fileInputRef.current.value = ""
		}
	}

	return (
		<>
			<div className="relative">
				<InputImage
					value={image}
					id={id}
					ref={fileInputRef as any}
					onChange={handleImageSelect}
					accept="image/*"
					className={inputClassName as any}
					icons={icons}
					{...rest}
				/>

				{isUploading && (
					<span
						className={clsx(
							"inline-flex top-7 absolute justify-center items-center bg-overlay-white-50 size-16",
							uploaderClassName,
						)}
					>
						<Loader />
					</span>
				)}

				{image && (
					<button
						type="button"
						onClick={e => {
							e.stopPropagation()
							setIsOpen(true)
						}}
						className={clsx(
							"top-4 left-12 absolute bg-red-500 hover:bg-red-600 p-1 rounded-full text-white",
							deleteButtonClassName,
						)}
					>
						<BiX size={16} />
					</button>
				)}
			</div>

			<Modal isOpen={isOpen} setIsOpen={setIsOpen} hideCloseButton>
				<Alert color="danger" className="max-w-[600px]">
					<Text>Are you sure you want to delete this picture?</Text>

					<Flexbox gap="xs">
						<Button
							color="danger"
							onClick={() => {
								setImage("")
								removeImage()
								setIsOpen(false)
							}}
							type="button"
						>
							Yes, delete picture
						</Button>

						<Button
							variant="transparent"
							onClick={() => setIsOpen(false)}
							color="danger"
						>
							No, cancel
						</Button>
					</Flexbox>
				</Alert>
			</Modal>
		</>
	)
}
