import { Schema, model, models } from "mongoose"
import { userRoles, type User } from "types"

if (models?.User) {
	delete models.User
}

const userSchema = new Schema<User>(
	{
		fullName: String,
		email: { type: String, unique: true },
		password: String,
		avatar: String,
		role: { type: String, enum: Object.keys(userRoles) },
		verified: Boolean,
		verifyToken: String,
		resetToken: String,
		bio: String,
		slug: String,
	},
	{ timestamps: true },
)

export const UserModel = model<User>("User", userSchema)
