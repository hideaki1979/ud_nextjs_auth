import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { signupFormSchema } from "../lib/authFormSchema"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuthStore } from "../store/authStore"

export const useSignupForm = () => {
    const form = useForm({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    })
    const router = useRouter()
    const [err, setErr] = useState<string>('')
    const signUp = useAuthStore(state => state.signUp)

    const onSubmit: SubmitHandler<z.infer<typeof signupFormSchema>> = async (data) => {
        const { username, email, password } = data

        try {
            const { error } = await signUp(
                email,
                password,
                username
            )

            if (error) {
                setErr('既にメールアドレス登録されているユーザーです。')
                return
            }

            router.push(`/auth/email-confirm`)
        } catch (err) {
            if (err instanceof Error) {
                console.error('サインアップエラー：', err)

            }
        }
    }

    return { form, onSubmit, err }
}