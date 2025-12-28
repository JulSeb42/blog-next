"use client"
import { useState } from "react"
import Link from "next/link"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import {
	Dropdown,
	ButtonIcon,
	Text,
	Modal,
	Alert,
	Button,
	Flexbox,
	clsx,
	toast,
	capitalize,
} from "@julseb-lib/react"
import { Avatar } from "components/avatar"
import { useAuth } from "context"
import { adminService } from "api"
import type { LibDropdownItem } from "@julseb-lib/react/types"
import type { IUserCardAdmin } from "./types"

export default function UserCardAdmin({ user, setUsers }: IUserCardAdmin) {
	const { user: admin } = useAuth()

	const [currentUser, setCurrentUser] = useState(user)
	const [isOpen, setIsOpen] = useState(false)
	const [isRoleOpen, setIsRoleOpen] = useState(false)
	const [isResetOpen, setIsResetOpen] = useState(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)

	const items: Array<LibDropdownItem> = [
		{
			content: "Visit profile",
			element: Link,
			// @ts-ignore
			href: `/users/${currentUser._id}`,
		},
		{
			content: `Set as ${currentUser?.role === "admin" ? "user" : "admin"}`,
			onClick: () => setIsRoleOpen(true),
			disabled: currentUser?._id === admin?._id,
		},
		{
			content: "Reset password",
			onClick: () => setIsResetOpen(true),
			disabled: currentUser._id === admin?._id,
		},
		{
			content: "Remove user",
			onClick: () => setIsDeleteOpen(true),
			disabled: currentUser._id === admin?._id,
		},
	]

	const handleRole = () => {
		const newRole = user.role === "admin" ? "user" : "admin"

		adminService
			.editUserRole(user._id, { role: newRole as any })
			.then(res => {
				setCurrentUser(res.data)
				toast.success(`${currentUser.fullName} is now ${newRole}`)
			})
			.catch(err => {
				toast.error("An error occurred, check console")
				console.error(err)
			})
			.finally(() => {
				setIsOpen(false)
				setIsRoleOpen(false)
			})
	}

	const handleReset = () => {
		adminService
			.resetPassword(currentUser._id)
			.then(res => toast.success(res.data.message))
			.catch(err => {
				toast.error("An error occurred, check console")
				console.error(err)
			})
			.finally(() => {
				setIsOpen(false)
				setIsResetOpen(false)
			})
	}

	const handleDelete = () => {
		adminService
			.deleteUser(currentUser._id)
			.then(res => {
				toast.success(res.data.message)
				setUsers(prev => prev.filter(u => u._id !== currentUser._id))
			})
			.catch(err => {
				toast.error("An error occurred, check console")
				console.error(err)
			})
			.finally(() => {
				setIsDeleteOpen(false)
				setIsOpen(false)
			})
	}

	return (
		<>
			<div
				className={clsx(
					"relative rounded-xl w-full aspect-square",
					isOpen && "z-50",
					"user-card-admin",
				)}
			>
				<Avatar
					user={currentUser}
					className="top-0 left-0 z-0 absolute rounded-xl size-full text-2xl"
				/>

				<span className="block top-0 left-0 z-10 absolute bg-overlay-gradient-black rounded-xl size-full" />

				<div className="top-1 right-1 z-30 absolute">
					<ButtonIcon
						icon={<BiDotsHorizontalRounded />}
						onClick={() => setIsOpen(!isOpen)}
						className="size-6"
						color="white"
					/>
					<Dropdown
						items={items}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						className="right-0 left-[unset] w-35 -translate-y-2"
						shadow="md"
					/>
				</div>

				<div className="z-20 relative flex flex-col justify-end items-start p-2 size-full">
					<Text color="white">{currentUser.fullName}</Text>
					<Text tag="small" color="gray-300">
						{capitalize(currentUser.role)}
					</Text>
				</div>
			</div>

			<Modal isOpen={isResetOpen} setIsOpen={setIsResetOpen}>
				<Alert color="danger">
					<Text>
						Are you sure you want to reset {currentUser.fullName}'s
						password?
					</Text>

					<Flexbox gap="md">
						<Button color="danger" onClick={handleReset}>
							Yes, reset their password
						</Button>
						<Button
							color="danger"
							variant="transparent"
							onClick={() => setIsResetOpen(false)}
						>
							No, cancel
						</Button>
					</Flexbox>
				</Alert>
			</Modal>

			<Modal isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen}>
				<Alert color="danger">
					<Text>
						Are you sure you want to delete {currentUser.fullName}'s
						account?
					</Text>

					<Flexbox gap="md">
						<Button color="danger" onClick={handleDelete}>
							Yes, delete their account
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

			<Modal isOpen={isRoleOpen} setIsOpen={setIsRoleOpen}>
				<Alert color="danger">
					<Text>
						Are you sure you want to set {currentUser.fullName} as{" "}
						{currentUser.role === "admin" ? "a user" : "an admin"}?
					</Text>

					<Flexbox gap="md">
						<Button color="danger" onClick={handleRole}>
							Yes, change their role
						</Button>
						<Button
							color="danger"
							variant="transparent"
							onClick={() => setIsRoleOpen(false)}
						>
							No, cancel
						</Button>
					</Flexbox>
				</Alert>
			</Modal>
		</>
	)
}
