import type { Metadata } from "next"
import { SrOnly, Wrapper, Main } from "@julseb-lib/react"
import { Page, PostsList } from "components"
import { FeaturedPosts } from "./(home)/featured-posts"
import { postService } from "api"
import { SITE_DATA } from "data"
import type { ResponseInfinitePosts } from "types"

async function getPosts(): Promise<ResponseInfinitePosts> {
	return await postService
		.allPosts({ limit: 10, page: 1 })
		.then(res => res.data)
		.catch(err => err)
}

export const metadata: Metadata = {
	title: `Homepage | ${SITE_DATA.NAME}`,
}

export default async function Home() {
	const posts = await getPosts()

	return (
		<Page type="all" noWrapper>
			<SrOnly element="h1">Homepage of {SITE_DATA.NAME}</SrOnly>
			<FeaturedPosts />

			<Wrapper>
				<Main size="large">
					<PostsList
						posts={posts.posts}
						pagination={posts.pagination}
					/>
				</Main>
			</Wrapper>
		</Page>
	)
}
