import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { signupFormSchema } from "../lib/authFormSchema"
import { z } from "zod"
import { supabase } from "../lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useState } from "react"

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

    const onSubmit: SubmitHandler<z.infer<typeof signupFormSchema>> = async (data) => {
        const { username, email, password } = data

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { username } }
            })
            if (signUpError) {
                setErr(signUpError.message)
                return
            }

            const { error: userError } = await supabase
                .from('Users')
                .insert([{
                    id: data.user?.id,
                    username,
                    email
                }])

            if (userError) {
                if (userError.message.includes('duplicate key value violates unique constraint')) {
                    setErr('既にメールアドレス登録されているユーザーです。')
                }
                // console.error('ユーザー情報登録エラー：', userError.message)
                return
            }

            router.push(`/auth/email-confirm`)
        } catch (error) {
            if (error instanceof Error) {
                console.error('サインアップエラー：', error)

            }
        }
    }

    return { form, onSubmit, err }
}