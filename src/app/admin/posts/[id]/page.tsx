import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { AdminPage, AdminIsland, PostForm } from "components"
import { postService } from "api"
import type { Post } from "types"

async function getPost(id: string): Promise<Post> {
	return await postService
		.post(id)
		.then(res => res.data)
		.catch(err => err)
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const post = await getPost(id)

	const metadata: Metadata = {
		title: `Edit ${post.title}`,
	}

	return metadata
}

export default async function AdminEditPost({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const post = await getPost(id)

	return (
		<AdminPage>
			<AdminIsland>
				<Text tag="h1">Edit {post.title}</Text>
			</AdminIsland>

			<PostForm post={post} />
		</AdminPage>
	)
}
