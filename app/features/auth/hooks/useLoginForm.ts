import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { loginFormSchema } from "../lib/authFormSchema"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

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

    const onSubmit: SubmitHandler<z.infer<typeof loginFormSchema>> = async (data) => {
        const { email, password } = data

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            if (signInError) {
                // console.error(signInError.message)
                if (signInError.message.includes('Email not confirmed')) {
                    setErr('登録したメールアドレスに送付したメールを確認し、認証をしてください')
                } else if (signInError.message.includes('Invalid login credentials')) {
                    setErr('未登録のメールアドレスです。')
                }
                return
            }

            router.push(`/`)
        } catch (error) {
            if (error instanceof Error) {
                console.error('サインアップエラー：', error)

            }
        }
    }

    return { form, onSubmit, err }
}