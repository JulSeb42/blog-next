import { http } from "./http-common"
import { generateServerRoute } from "utils"
import type { SERVER_PATHS } from "./server-paths"
import type {
	RegisterUserFormData,
	AuthenticateUserFormData,
	VerifyUserFormData,
	ForgotPasswordFormData,
	ResetPasswordFormData,
} from "types"

type PATHS = keyof typeof SERVER_PATHS.AUTH

const generateRoute = (
	route: Exclude<PATHS, "ROOT">,
	param?: string | Array<string>,
) => generateServerRoute("AUTH", route, param)

class AuthService {
	signup = async (data: RegisterUserFormData) =>
		await http.post(generateRoute("SIGNUP"), data)

	login = async (data: AuthenticateUserFormData) =>
		await http.post(generateRoute("LOGIN"), data)

	loggedIn = async () => await http.get(generateRoute("LOGGED_IN"))

	refresh = async () => await http.post(generateRoute("REFRESH"))

	verify = async (data: VerifyUserFormData) =>
		await http.post(generateRoute("VERIFY"), data)

	forgotPassword = async (data: ForgotPasswordFormData) =>
		await http.post(generateRoute("FORGOT_PASSWORD"), data)

	resetPassword = async (data: ResetPasswordFormData) =>
		await http.post(generateRoute("RESET_PASSWORD"), data)

	logout = async () => await http.post(generateRoute("LOGOUT"))

	/* Prepend route - DO NOT REMOVE */
}

export const authService = new AuthService()
