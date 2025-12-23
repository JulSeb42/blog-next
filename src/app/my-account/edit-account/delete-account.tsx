"use client"
import { useState, useEffect } from "react"
import { redirect } from "next/navigation"
import { Modal, Alert, Flexbox, Text, Button } from "@julseb-lib/react"
import { useModalOpen, useAuth } from "context"
import { userService } from "api"

export function DeleteAccount() {
	const { user, logout } = useAuth()
	const { setHasModalOpen } = useModalOpen()

	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (!isOpen) setHasModalOpen(false)
	}, [isOpen])

	const handleDelete = () => {
		userService.deleteAccount(user._id).then(() => {
			logout()
			redirect("/goodbye")
		})
	}

	return (
		<>
			<Button
				color="danger"
				onClick={() => {
					setIsOpen(true)
					setHasModalOpen(true)
				}}
			>
				Delete your account
			</Button>

			<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
				<Alert color="danger">
					<Text>Are you sure you want to delete your account?</Text>

					<Flexbox gap="xs">
						<Button color="danger" onClick={handleDelete}>
							Yes, delete it
						</Button>

						<Button
							color="danger"
							variant="transparent"
							onClick={() => {
								setIsOpen(false)
								setHasModalOpen(false)
							}}
						>
							No, cancel
						</Button>
					</Flexbox>
				</Alert>
			</Modal>
		</>
	)
}
