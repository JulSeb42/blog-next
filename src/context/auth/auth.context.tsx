"use client"
import { createContext, useContext, useState, useEffect, useRef } from "react"
import { authService } from "api"
import { getCookie } from "utils"
import type { User } from "types"
import type { IAuthContext } from "./type"

const AuthContext = createContext<IAuthContext>(null as any)

export function AuthProviderWrapper({ children }: { children: Children }) {
	const [user, setUser] = useState<User>(null as any)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [loading, setLoading] = useState(true)
	const isLogoutInProgress = useRef(false)

	const logout = async () => {
		if (isLogoutInProgress.current) return

		isLogoutInProgress.current = true
		setLoading(true)

		try {
			await authService.logout()
			setUser(null as any)
			setIsLoggedIn(false)
		} catch (error) {
			console.error("Logout error:", error)
		} finally {
			setLoading(false)
			isLogoutInProgress.current = false
		}
	}

	const checkAuth = async () => {
		setLoading(true)

		await authService
			.loggedIn()
			.then(res => {
				if (res.data.loggedIn) {
					setUser(res.data.user)
					setIsLoggedIn(true)
				} else {
					setUser(null as any)
					setIsLoggedIn(false)
				}
			})
			.catch(err => {
				console.error(err)
				setUser(null as any)
				setIsLoggedIn(false)
			})
			.finally(() => setLoading(false))
	}

	useEffect(() => {
		const authStatus = getCookie("auth_status")

		if (authStatus) {
			checkAuth()
		} else {
			setLoading(false)
		}
	}, [])

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				loading,
				setLoading,
				isLoggedIn,
				refetch: checkAuth,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext) as IAuthContext
