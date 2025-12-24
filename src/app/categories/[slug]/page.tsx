import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { Page, PostsList, BackButton } from "components"
import { categoryService, postService } from "api"
import type { Category, Post, ServerPagination } from "types"

async function getCategory(slug: string): Promise<Category> {
	return await categoryService
		.categorySlug(slug)
		.then(res => res.data)
		.catch(err => err)
}

async function getCategoryPosts(
	slug: string,
): Promise<{ posts: Array<Post>; pagination: ServerPagination }> {
	return await postService
		.allPosts({ page: 1, limit: 10, category: slug })
		.then(res => res.data)
		.catch(err => err)
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const category = await getCategory(slug)

	const metadata: Metadata = {
		title: category.name,
	}

	return metadata
}

export default async function Category({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const category = await getCategory(slug)
	const { posts, pagination } = await getCategoryPosts(slug)

	return (
		<Page type="all">
			<BackButton />
			<Text tag="h1">All posts in {category.name}</Text>
			<PostsList posts={posts} pagination={pagination} />
		</Page>
	)
}
