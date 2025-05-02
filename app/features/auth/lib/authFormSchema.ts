import { z } from "zod";

export const signupFormSchema = z.object({
    username: z
        .string()
        .min(4, { message: "ユーザー名は4文字以上で入力してください" }),
    email: z.string().email({ message: "メールアドレスを正しい形式で入力してください" }),
    password: z
        .string()
        .min(8, { message: "パスワードは8文字以上で入力してください" })
        .max(12, { message: "パスワードは12文字以下で入力してください" })

})

export const loginFormSchema = z.object({
    email: z.string().email({ message: "メールアドレスを正しい形式で入力してください" }),
    password: z
        .string()
        .min(8, { message: "パスワードは8文字以上で入力してください" })
        .max(12, { message: "パスワードは12文字以下で入力してください" })

})