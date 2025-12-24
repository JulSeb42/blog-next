import type { Metadata } from "next"
import { MarkdownContainer, Wrapper, Main, Hr } from "@julseb-lib/react"
import { Page, BackButton, AuthorCard } from "components"
import { PostCover } from "./cover"
import { PostIntro } from "./intro"
import { PostComments } from "./comments"
import { postService, commentService } from "api"
import type { Comment, Post, ServerPagination } from "types"

async function getPost(slug: string): Promise<Post> {
	return await postService
		.postSlug(slug)
		.then(res => res.data)
		.catch(err => err)
}

async function getComments(
	slug: string,
): Promise<{ comments: Array<Comment>; pagination: ServerPagination }> {
	return await commentService
		.allComments({ post: slug, page: 1, limit: 10 })
		.then(res => res.data)
		.catch(err => err)
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const post = await getPost(slug)

	const metadata: Metadata = {
		title: post.title,
	}

	return metadata
}

export default async function Post({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const post = await getPost(slug)
	const { comments, pagination } = await getComments(slug)

	return (
		<Page type="all" noWrapper>
			<article className="flex flex-col gap-6">
				<PostCover post={post} />

				<Wrapper className="pt-0!">
					<Main>
						<BackButton />
						<PostIntro post={post} />
						<MarkdownContainer>{post.body}</MarkdownContainer>
						<AuthorCard author={post.author} />
						<Hr />
						<PostComments
							comments={comments}
							pagination={pagination}
							slug={slug}
							postId={post._id}
						/>
					</Main>
				</Wrapper>
			</article>
		</Page>
	)
}
