import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { loginFormSchema } from "../lib/authFormSchema"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuthStore } from "../store/authStore"

export const useLoginForm = () => {
    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const router = useRouter()
    const [err, setErr] = useState<string>('')
    const signIn = useAuthStore(state => state.signIn)

    const onSubmit: SubmitHandler<z.infer<typeof loginFormSchema>> = async (data) => {
        const { email, password } = data

        try {
            const { error } = await signIn(
                email,
                password
            )
            if (error) {
                // console.error(signInError.message)
                if (error.includes('Email not confirmed')) {
                    setErr('登録したメールアドレスに送付したメールを確認し、認証をしてください')
                } else if (error.includes('Invalid login credentials')) {
                    setErr('未登録のメールアドレスです。')
                }
                return
            }

            router.push(`/`)
        } catch (err) {
            if (err instanceof Error) {
                console.error('サインアップエラー：', err)

            }
        }
    }

    return { form, onSubmit, err }
}