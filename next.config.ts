import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "raw.githubusercontent.com",
				pathname: "/Ashwinvalento/cartoon-avatar/master/lib/images/**",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
		],
	},
}

export default nextConfig
