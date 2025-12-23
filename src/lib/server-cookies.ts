import { cookies } from "next/headers"

/**
 * Server-side cookie utilities for Next.js App Router
 */
export class ServerCookies {
	/**
	 * Get a specific cookie value
	 */
	static async get(name: string): Promise<string | undefined> {
		const cookieStore = await cookies()
		return cookieStore.get(name)?.value
	}

	/**
	 * Get all cookies as an object
	 */
	static async getAll(): Promise<Record<string, string>> {
		const cookieStore = await cookies()
		const allCookies = cookieStore.getAll()

		return allCookies.reduce(
			(acc, cookie) => {
				acc[cookie.name] = cookie.value
				return acc
			},
			{} as Record<string, string>,
		)
	}

	/**
	 * Check if a cookie exists
	 */
	static async has(name: string): Promise<boolean> {
		const cookieStore = await cookies()
		return cookieStore.has(name)
	}

	/**
	 * Get authentication token from cookies
	 */
	static async getAuthToken(): Promise<string | undefined> {
		return this.get("access_token")
	}

	/**
	 * Get refresh token from cookies
	 */
	static async getRefreshToken(): Promise<string | undefined> {
		return this.get("refresh_token")
	}

	/**
	 * Get auth status from cookies
	 */
	static async getAuthStatus(): Promise<string | undefined> {
		return this.get("auth_status")
	}

	/**
	 * Get multiple cookies at once
	 */
	static async getMultiple(
		names: Array<string>,
	): Promise<Record<string, string | undefined>> {
		const cookieStore = await cookies()
		const result: Record<string, string | undefined> = {}

		for (const name of names) {
			result[name] = cookieStore.get(name)?.value
		}

		return result
	}

	/**
	 * Parse cookie header manually (for compatibility with older code)
	 */
	static parseCookieHeader(cookieHeader: string): Record<string, string> {
		if (!cookieHeader) return {}

		return Object.fromEntries(
			cookieHeader.split(";").map(c => {
				const [key, ...v] = c.trim().split("=")
				return [key, decodeURIComponent(v.join("="))]
			}),
		)
	}
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use ServerCookies.get() instead
 */
export async function getServerCookie(
	name: string,
): Promise<string | undefined> {
	return ServerCookies.get(name)
}

/**
 * Get auth cookies in one call
 */
export async function getAuthCookies() {
	return ServerCookies.getMultiple([
		"access_token",
		"refresh_token",
		"auth_status",
	])
}
