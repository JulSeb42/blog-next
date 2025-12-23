import type { Metadata } from "next"
import { Page, UserHeader } from "components"
import { userService } from "api"
import type { User } from "types"

async function getUser(id: string) {
	return (await userService
		.getUser(id)
		.then(res => res.data)
		.catch(err => {
			console.error(err)
			return null
		})) as User
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	const data = await getUser(id)

	if (!data) {
		return {
			title: "User Not Found",
			description: "The requested user could not be found.",
		}
	}

	const metadata: Metadata = {
		title: data.fullName,
	}

	return metadata
}

export default async function UserPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const user = await getUser(id)

	return (
		<Page type="all">
			<UserHeader user={user} isPublic />
		</Page>
	)
}
