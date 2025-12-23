"use client"
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react"
import { redirect } from "next/navigation"
import { Form, Input, InputCheck } from "@julseb-lib/react"
import { ErrorMessage } from "components"
import { authService } from "api"
import { useAuth } from "context"
import type { IErrorMessage } from "types"

export function LoginForm() {
	const { refetch, setLoading } = useAuth()

	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	})
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)
	const [saveEmail, setSaveEmail] = useState<boolean>(false)
	
	useEffect(() => {
		const savedEmail = localStorage.getItem("email")
		if (savedEmail) {
			setInputs(prev => ({ ...prev, email: savedEmail }))
			setSaveEmail(true)
		}
	}, [])

	const handleInputs = (e: ChangeEvent<HTMLInputElement>) =>
		setInputs({ ...inputs, [e.target.id]: e.target.value })

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		
		if (saveEmail) {
			localStorage.setItem("email", inputs.email)
		} else {
			localStorage.removeItem("email")
		}

		authService
			.login(inputs)
			.then(() => {
				refetch()
				setLoading(true)
				redirect("/my-account")
			})
			.catch(err => {
				console.error(err)
				setErrorMessage(err?.response?.data?.message)
			})
			.finally(() => {
				setIsLoading(false)
				setLoading(false)
			})
	}

	return (
		<>
			<Form
				buttonPrimary="Login"
				onSubmit={handleSubmit}
				isLoading={isLoading}
			>
				<Input
					label="Email"
					id="email"
					value={inputs.email}
					onChange={handleInputs}
				/>

				<Input
					label="Password"
					id="password"
					type="password"
					value={inputs.password}
					onChange={handleInputs}
				/>

				<InputCheck
					id="save"
					checked={saveEmail}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setSaveEmail(e.target.checked)
					}
					variant="toggle"
				>
					Save your email for faster login?
				</InputCheck>
			</Form>

			<ErrorMessage>{errorMessage}</ErrorMessage>
		</>
	)
}
