import dynamic from "next/dynamic"

export const ImageUploader = dynamic(() => import("./image-uploader"))
