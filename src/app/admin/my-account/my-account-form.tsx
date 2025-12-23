"use client"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { Form, Input, toast } from "@julseb-lib/react"
import { ErrorMessage, ImageUploader } from "components"
import { useAuth } from "context"
import { userService } from "api"
import { COMMON_TEXTS } from "data"
import type { LibValidationStatus } from "@julseb-lib/react/types"

export function MyAccountForm() {
	const { user, setUser } = useAuth()

	const [inputs, setInputs] = useState({
		fullName: "",
	})
	const [avatar, setAvatar] = useState("")
	const [validation, setValidation] = useState<{
		fullName: LibValidationStatus
	}>({
		fullName: undefined,
	})
	const [errorMessage, setErrorMessage] = useState(undefined)
	const [isLoading, setIsLoading] = useState(true)
	const [isUploading, setIsUploading] = useState(false)

	useEffect(() => {
		if (user) {
			setInputs({ fullName: user.fullName || "" })
			setAvatar(user.avatar || "")
			setIsLoading(false)
		} else {
			setIsLoading(false)
		}
	}, [user])

	if (!user && !isLoading) {
		throw new Error("No user data available")
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target

		setInputs({ ...inputs, [id]: value })

		if (validation.fullName) {
			setValidation({
				fullName: value.length ? false : true,
			})
		}
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		setIsLoading(true)

		if (!inputs.fullName?.length) {
			setValidation({
				...validation,
				fullName: !inputs.fullName?.length ? true : undefined,
			})
			setIsLoading(false)
			return
		}

		userService
			.editAccount(user!._id, {
				...inputs,
				avatar,
			})
			.then(res => {
				setUser(res.data.user)
				toast.success("Your changes have been saved!")
			})
			.catch(err => {
				console.error("❌ Failed to update account:", err)
				setErrorMessage(
					err.response?.data?.message || "Failed to update account",
				)
			})
			.finally(() => setIsLoading(false))
	}

	return (
		<>
			<Form
				buttonPrimary="Save changes"
				buttonSecondary={{
					content: "Cancel",
					onClick: () => redirect("/my-account"),
				}}
				onSubmit={handleSubmit}
				isLoading={isLoading || isUploading}
			>
				<Input
					id="fullName"
					label="Full name"
					value={inputs.fullName}
					onChange={handleChange}
					validation={{
						status: validation.fullName,
						message: COMMON_TEXTS.ERRORS.FULL_NAME_EMPTY,
					}}
				/>

				<Input
					id="email"
					label="Email"
					value={user?.email || ""}
					disabled
					aria-disabled
					helperBottom="You can not edit your email."
				/>

				<ImageUploader
					id="avatar"
					image={avatar}
					setImage={setAvatar}
					isUploading={isUploading}
					setIsUploading={setIsUploading}
					label="Avatar"
				/>
			</Form>

			<ErrorMessage>{errorMessage}</ErrorMessage>
		</>
	)
}
