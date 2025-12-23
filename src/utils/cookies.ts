"use client"

export const debugCookies = () => {
	if (typeof document === "undefined") {
		return
	}

	const testCookieName = "test_cookie_" + Date.now()
	document.cookie = `${testCookieName}=test_value; path=/`

	document.cookie = `${testCookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}

export const getAllCookies = (): Record<string, string> => {
	if (typeof document === "undefined") {
		return {}
	}

	const cookies: Record<string, string> = {}

	if (!document.cookie || document.cookie.trim() === "") {
		return cookies
	}

	const cookieString = document.cookie.trim()
	const cookieArray = cookieString.split(/;\s*/)

	cookieArray.forEach(cookie => {
		const equalIndex = cookie.indexOf("=")
		if (equalIndex > 0) {
			const name = cookie.substring(0, equalIndex).trim()
			const value = cookie.substring(equalIndex + 1).trim()

			if (name) {
				try {
					cookies[name] = decodeURIComponent(value)
				} catch (err) {
					console.error(err)
					cookies[name] = value
				}
			}
		} else {
			console.error(`Invalid cookie format (no = found):`, cookie)
		}
	})

	return cookies
}

export const getCookie = (name: string): string | null => {
	if (typeof document === "undefined") {
		return null
	}

	const value = `; ${document.cookie}`
	const parts = value.split(`; ${name}=`)
	if (parts.length === 2) {
		return decodeURIComponent(parts.pop()?.split(";").shift() || "")
	}
	return null
}

export const getAllCookiesRegex = (): Record<string, string> => {
	if (typeof document === "undefined") {
		return {}
	}

	const cookies: Record<string, string> = {}

	const cookieRegex = /([^=]+)=([^;]*)/g
	let match

	while ((match = cookieRegex.exec(document.cookie)) !== null) {
		const name = match[1].trim()
		const value = match[2].trim()

		if (name) {
			try {
				cookies[name] = decodeURIComponent(value)
			} catch {
				cookies[name] = value
			}
		}
	}

	return cookies
}

export const setCookie = (
	name: string,
	value: string,
	days: number = 7,
): void => {
	if (typeof document === "undefined") {
		return
	}

	const expires = new Date(Date.now() + days * 864e5).toUTCString()
	document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}

export const deleteCookie = (name: string): void => {
	if (typeof document === "undefined") {
		return
	}

	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export const explainCookieVisibility = () => {
	if (typeof document === "undefined") {
		return "Running on server - no access to document.cookie"
	}

	const accessibleCount = getAllCookies()

	return accessibleCount
}
