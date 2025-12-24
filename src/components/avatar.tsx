import {
	Avatar as Container,
	LazyImage,
	clsx,
	getInitials,
} from "@julseb-lib/react"
import type { User } from "types"

export function Avatar({ user, className }: IAvatar) {
	return (
		<Container className={clsx(className, "avatar")}>
			{user.avatar ? (
				<LazyImage
					src={user.avatar}
					alt={`Avatar ${user.fullName}`}
					className="size-full object-cover"
					skeletonAnimation="shine"
					skeletonClasses="size-full"
					width={500}
					height={500}
				/>
			) : (
				getInitials(user.fullName)
			)}
		</Container>
	)
}

interface IAvatar {
	user: User
	className?: string
}
