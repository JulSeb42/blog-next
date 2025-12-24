"use client"
import { useState } from "react"
import { Form, Input, Text, Button } from "@julseb-lib/react"
import { ErrorMessage } from "components"
import { commentService } from "api"
import type { LibValidationStatus } from "@julseb-lib/react/types"
import type { Comment, IErrorMessage } from "types"

type Validation = {
	author: LibValidationStatus
	body: LibValidationStatus
}

const initialState = { author: "", body: "" }

export function NewCommentForm({ setComments, postId }: INewCommentForm) {
	const [isOpen, setIsOpen] = useState(false)
	const [inputs, setInputs] = useState(initialState)
	const [validation, setValidation] = useState<Validation>({
		author: undefined,
		body: undefined,
	})
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)

	const handleInputs = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => setInputs({ ...inputs, [e.target.id]: e.target.value })

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		setErrorMessage(undefined)
		setValidation({ author: undefined, body: undefined })

		if (!inputs.author.length || !inputs.body.length) {
			setValidation({
				author: !inputs.author.length ? false : undefined,
				body: !inputs.body.length ? false : undefined,
			})
			return
		}

		setIsLoading(true)

		const requestBody = { ...inputs, post: postId }

		commentService
			.newComment(requestBody)
			.then(res => {
				setComments(prev => [res.data, ...prev])
				setInputs(initialState)
				setIsOpen(false)
			})
			.catch(err => {
				console.error(err)
				setErrorMessage(err?.response?.data?.message)
			})
			.finally(() => setIsLoading(false))
	}

	if (!isOpen)
		return (
			<Button
				variant="transparent"
				className="p-0"
				onClick={() => setIsOpen(true)}
			>
				Add a new comment
			</Button>
		)

	return (
		<Form
			buttonPrimary="Add a comment"
			buttonSecondary={{
				content: "Cancel",
				onClick: () => {
					setIsOpen(false)
					setInputs(initialState)
				},
			}}
			className="p-6 border border-gray-200 rounded-2xl"
			isLoading={isLoading}
			onSubmit={handleSubmit}
		>
			<Text tag="h4">Add a new comment</Text>

			<Input
				id="author"
				label="Your name"
				value={inputs.author}
				onChange={handleInputs}
				validation={{
					status: validation.author,
					message: "Your name can't be empty",
				}}
			/>

			<Input
				id="body"
				label="Your comment"
				value={inputs.body}
				onChange={handleInputs}
				type="textarea"
				validation={{
					status: validation.body,
					message: "Your comment can't be empty",
				}}
			/>

			<ErrorMessage>{errorMessage}</ErrorMessage>
		</Form>
	)
}

interface INewCommentForm {
	postId: string
	setComments: DispatchState<Array<Comment>>
}
