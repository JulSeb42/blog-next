export const BASE_API_URL = "/api"

const SERVER_PATHS_ROOT = {
	AUTH: "/auth",
	USER: "/user",
	UPLOADER: "/uploader",
	ADMIN: "/admin",
	POST: "/post",
	CATEGORY: "/category",
	COMMENT: "/comment",
	/* Prepend path root - DO NOT REMOVE */
}

export const SERVER_PATHS = {
	AUTH: {
		ROOT: SERVER_PATHS_ROOT.AUTH,
		SIGNUP: "/signup", // POST
		LOGIN: "/login", // POST
		LOGGED_IN: "/loggedin", // GET
		REFRESH: "/refresh", // POST
		LOGOUT: "/logout", // POST
		VERIFY: "/verify", // POST
		FORGOT_PASSWORD: "/forgot-password", // POST
		RESET_PASSWORD: "/reset-password", // POST
	},
	USER: {
		ROOT: SERVER_PATHS_ROOT.USER,
		ALL_USERS: "/all-users", // GET
		USER: (id: string) => `/user/${id}`, // GET
		USER_SLUG: (slug = ":slug") => `/user-slug/${slug}`, // GET
		EDIT_ACCOUNT: (id = ":id") => `/edit-account/${id}`, // PUT
		EDIT_PASSWORD: (id = ":id") => `/edit-password/${id}`, // PUT
		DELETE_ACCOUNT: (id = ":id") => `/delete-account/${id}`, // DELETE
	},
	UPLOADER: {
		ROOT: SERVER_PATHS_ROOT.UPLOADER,
		UPLOAD_PICTURE: "/upload-picture",
	},
	ADMIN: {
		ROOT: SERVER_PATHS_ROOT.ADMIN,
		EDIT_USER_ROLE: (id = ":id") => `/edit-user-role/${id}`, // PUT
		RESET_PASSWORD: (id = ":id") => `/reset-password/${id}`, // PUT
		DELETE_USER: (id = ":id") => `/delete-user/${id}`, // DELETE
	},
	POST: {
		ROOT: SERVER_PATHS_ROOT.POST,
		ALL_POSTS: "/all-posts", // GET
		FEATURED_POSTS: "/featured-posts", // GET
		POST: (id = ":id") => `/post/${id}`, // GET
		POST_SLUG: (slug = ":slug") => `/post-slug/${slug}`, // GET
		NEW_POST: "/new-post", // POST
		EDIT_POST: (id = ":id") => `/edit-post/${id}`, // PUT
		DELETE_POST: (id = ":id") => `/delete-post/${id}`, // DELETE
	},
	CATEGORY: {
		ROOT: SERVER_PATHS_ROOT.CATEGORY,
		ALL_CATEGORIES: "/all-categories", // GET
		CATEGORY: (id = ":id") => `/category/${id}`, // GET
		CATEGORY_SLUG: (slug = ":slug") => `/category-slug/${slug}`, // GET
		NEW_CATEGORY: "/new-category", // POST
		EDIT_CATEGORY: (id = ":id") => `/edit-category/${id}`, // PUT
		DELETE_CATEGORY: (id = ":id") => `/delete-category/${id}`, // DELETE
	},
	COMMENT: {
		ROOT: SERVER_PATHS_ROOT.COMMENT,
		ALL_COMMENTS: "/all-comments", // GET
		NEW_COMMENT: "/new-comment", // POST
		DELETE_COMMENT: (id = ":id") => `/delete-comment/${id}`, // DELETE
	},
	/* Prepend server path - DO NOT REMOVE */
}
