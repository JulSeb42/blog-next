import type { NextRequest } from "next/server"

export const getAllCookiesFromRequest = (
	req: Request | NextRequest,
): Record<string, string> => {
	const cookieHeader = req.headers.get("cookie") ?? ""

	if (!cookieHeader) {
		return {}
	}

	return Object.fromEntries(
		cookieHeader
			.split(";")
			.map(c => {
				const [key, ...v] = c.trim().split("=")
				return [key, decodeURIComponent(v.join("="))]
			})
			.filter(([key]) => key),
	)
}

export const getCookieFromRequest = (
	req: Request | NextRequest,
	name: string,
): string | null => {
	const cookies = getAllCookiesFromRequest(req)
	return cookies[name] || null
}

// Example usage in API route:
export const parseCookieHeader = (
	cookieHeader: string,
): Record<string, string> => {
	if (!cookieHeader) {
		return {}
	}

	return Object.fromEntries(
		cookieHeader
			.split(";")
			.map(c => {
				const [key, ...v] = c.trim().split("=")
				return [key, decodeURIComponent(v.join("="))]
			})
			.filter(([key]) => key),
	)
}
