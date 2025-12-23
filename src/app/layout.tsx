import type { Metadata, Viewport } from "next"
import { ThemeProviderWrapper, ToastContainer } from "@julseb-lib/react"
import { lato } from "components"
import {
	AuthProviderWrapper,
	ModalOpenProviderWrapper,
	/* Prepend context import - DO NOT REMOVE */
} from "context"
import { SITE_DATA } from "data"
import "@julseb-lib/react/index.css"
import "styles/index.css"

export const metadata: Metadata = {
	title: {
		template: `%s | ${SITE_DATA.NAME}`,
		default: SITE_DATA.NAME,
	},
	description: SITE_DATA.DESCRIPTION,
	generator: SITE_DATA.GENERATOR,
	icons: SITE_DATA.FAVICON,
	authors: { name: SITE_DATA.AUTHOR, url: SITE_DATA.URL },
	creator: SITE_DATA.AUTHOR,
	keywords: SITE_DATA.KEYWORDS,
	applicationName: SITE_DATA.NAME,
	publisher: SITE_DATA.AUTHOR,
	category: SITE_DATA.TYPE,
	openGraph: {
		title: {
			template: `%s | ${SITE_DATA.NAME}`,
			default: SITE_DATA.NAME,
		},
		description: SITE_DATA.DESCRIPTION,
		siteName: SITE_DATA.NAME,
		type: SITE_DATA.TYPE as any,
		images: SITE_DATA.COVER,
		locale: SITE_DATA.LANGUAGE,
		url: SITE_DATA.URL,
		emails: SITE_DATA.EMAIL,
	},
	twitter: {
		title: {
			template: `%s | ${SITE_DATA.NAME}`,
			default: SITE_DATA.NAME,
		},
		description: SITE_DATA.DESCRIPTION,
		creator: SITE_DATA.AUTHOR,
		images: SITE_DATA.COVER,
		site: SITE_DATA.URL,
		card: SITE_DATA.TWITTER_CARD as any,
	},
}

export const viewport: Viewport = {
	themeColor: "#3B82F6",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: Children
}>) {
	return (
		<html lang="en">
			<body className={`${lato.className} antialiased`}>
				<ThemeProviderWrapper>
					<AuthProviderWrapper>
						<ModalOpenProviderWrapper>
							{children}
						</ModalOpenProviderWrapper>
						<ToastContainer position="bottom-right" />
					</AuthProviderWrapper>
				</ThemeProviderWrapper>
			</body>
		</html>
	)
}
