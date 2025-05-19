import { z } from "zod";

const MAX_MB = 5
const MAX_FILE_SIZE = MAX_MB * 1024 * 1024
const ACCEPTED_IMAGE_TYPE = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp"
]

export const postSchema = z.object({
    title: z.string()
        .min(3, "タイトルは3文字以上入力してください。"),
    content: z.string()
        .min(10, "本文は10文字以上入力してください"),
    file: z.custom<FileList>()
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `画像サイズは${MAX_MB}MBまでです。`)
        .refine((files) => ACCEPTED_IMAGE_TYPE.includes(files?.[0].type), ".jpg, .jpeg, .png, .webpファイルのみ添付可能です")
})