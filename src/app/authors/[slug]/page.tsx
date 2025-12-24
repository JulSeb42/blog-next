import type { Metadata } from "next"
import { Page, PostsList, BackButton } from "components"
import { AuthorHeader } from "./header"
import { userService, postService } from "api"
import type { Post, ServerPagination, User } from "types"

async function getUser(slug: string): Promise<User> {
	return await userService
		.userSlug(slug)
		.then(res => res.data)
		.catch(err => err)
}

async function getUserPosts(
	slug: string,
): Promise<{ posts: Array<Post>; pagination: ServerPagination }> {
	console.log({ slug })
	return await postService
		.allPosts({ page: 1, limit: 10, author: slug })
		.then(res => res.data)
		.catch(err => err)
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const user = await getUser(slug)

	const metadata: Metadata = {
		title: user.fullName,
	}

	return metadata
}

export default async function Author({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const user = await getUser(slug)
	const { posts, pagination } = await getUserPosts(slug)

	return (
		<Page type="all">
			<BackButton href="/authors" />
			<AuthorHeader author={user} />
			<PostsList posts={posts} pagination={pagination} />
		</Page>
	)
}
