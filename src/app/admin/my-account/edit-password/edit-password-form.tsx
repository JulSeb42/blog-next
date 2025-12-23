"use client"
import { useState } from "react"
import { redirect } from "next/navigation"
import { Form, Input, toast, passwordRegex } from "@julseb-lib/react"
import { ErrorMessage } from "components"
import { useAuth } from "context"
import { userService } from "api"
import { COMMON_TEXTS } from "data"
import type { LibValidationStatus } from "@julseb-lib/react/types"
import type { IErrorMessage } from "types"

export function EditPasswordForm() {
	const { setUser, user } = useAuth()

	const [inputs, setInputs] = useState({
		oldPassword: "",
		newPassword: "",
	})
	const [validation, setValidation] = useState<{
		oldPassword: LibValidationStatus
		newPassword: LibValidationStatus
	}>({
		oldPassword: undefined,
		newPassword: undefined,
	})
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setInputs({ ...inputs, [id]: value })

		if (
			validation.oldPassword !== undefined ||
			validation.newPassword !== undefined
		) {
			setValidation({
				...validation,
				[id]:
					value.length > 0
						? passwordRegex.test(value)
							? true
							: false
						: undefined,
			})
		}
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		if (!inputs.oldPassword || !inputs.newPassword) {
			setValidation({
				oldPassword: !inputs.oldPassword ? false : undefined,
				newPassword:
					!inputs.newPassword ||
					!passwordRegex.test(inputs.newPassword)
						? false
						: undefined,
			})
			return
		}

		setIsLoading(true)

		userService
			.editPassword(user?._id!, inputs)
			.then(res => {
				setUser(res.data.user)
				toast.success("Your new password has been saved!")
			})
			.then(() => setTimeout(() => redirect("/admin/my-account"), 300))
			.catch(err => setErrorMessage(err.response.data.message))
			.finally(() => setIsLoading(false))
	}

	return (
		<>
			<Form
				buttonPrimary="Save"
				buttonSecondary={{
					content: "Cancel",
					onClick: () => redirect("/my-account"),
				}}
				onSubmit={handleSubmit}
				isLoading={isLoading}
			>
				<Input
					id="oldPassword"
					label="Old password"
					type="password"
					value={inputs.oldPassword}
					onChange={handleChange}
					validation={{
						status: validation.oldPassword,
						message: COMMON_TEXTS.ERRORS.OLD_PASSWORD_REQUIRED,
					}}
				/>

				<Input
					id="newPassword"
					label="New password"
					type="password"
					value={inputs.newPassword}
					onChange={handleChange}
					validation={{
						status: validation.newPassword,
						message: COMMON_TEXTS.ERRORS.PASSWORD_NOT_VALID,
					}}
				/>
			</Form>

			<ErrorMessage>{errorMessage}</ErrorMessage>
		</>
	)
}
