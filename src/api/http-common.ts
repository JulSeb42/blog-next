/*
    Create API link
*/

import "dotenv/config"
import { axios } from "lib"
import { BASE_API_URL } from "utils"

export const http = axios.create({
	baseURL: BASE_API_URL,
	headers: {
		"Content-type": "application/json",
	},
	withCredentials: true,
})
