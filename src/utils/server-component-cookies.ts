"use server"
// For Server Components and Server Actions (App Router)
import { cookies } from "next/headers"

export const getAllServerCookies = async () => {
	const cookieStore = await cookies()
	const allCookies: Record<string, string> = {}

	cookieStore.getAll().forEach(cookie => {
		allCookies[cookie.name] = cookie.value
	})

	return allCookies
}

export const getServerCookie = async (name: string) => {
	const cookieStore = await cookies()
	return cookieStore.get(name)?.value || null
}

// Example usage in Server Component:
/*
export default function ServerComponent() {
	const allCookies = getAllServerCookies();
	const specificCookie = getServerCookie('access_token');
	
	return (
		<div>
			<p>All cookies: {JSON.stringify(allCookies)}</p>
			<p>Access token: {specificCookie}</p>
		</div>
	);
}
*/
