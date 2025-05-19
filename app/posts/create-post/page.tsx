"use client"

import { postSchema } from "@/app/features/auth/lib/postSchema"
import { supabase } from "@/app/features/auth/lib/supabaseClient"
import { useAuthStore } from "@/app/features/auth/store/authStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type PostInput = z.infer<typeof postSchema>

const CreatePostPage = () => {
    const { user } = useAuthStore()
    const { register, handleSubmit, formState, setValue } = useForm<PostInput>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            content: "",
            file: undefined
        }
    })
    const [error, setError] = useState('')
    const router = useRouter()

    const onSubmit = async (data: PostInput) => {
        // フォームの入力値を設定
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("content", data.content)
        formData.append("file", data.file[0])
        formData.append("userId", user?.id ?? "")

        // アクセストークン取得
        const { data: sessionData } = await supabase.auth.getSession()
        const accessToken = sessionData.session?.access_token

        const res = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData
        })
        const result = await res.json()
        if (result.status !== 200) {
            setError(result.error || '投稿に失敗しました。')
        } else {
            router.replace('/')
        }

    }

    return (
        <div className="max-w-lg mx-auto my-10 p-8 bg-white rounded-md shadow">
            <h2 className="text-2xl font-bold mb-8 text-center">
                記事作成
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && (
                    <p className="text-sm text-red-500 mb-4">
                        {error}
                    </p>
                )}
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block font-semibold mb-2"
                    >
                        タイトル
                    </label>
                    <input
                        id="title"
                        type="text"
                        className="border rounded-md w-full px-3 py-2"
                        {...register('title')}
                    />
                    {formState.errors.title && (
                        <p className="text-red-500 text-sm">
                            {formState.errors.title.message}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="content"
                        className="block font-semibold mb-2"
                    >
                        本文
                    </label>
                    <textarea
                        id="content"
                        className="border rounded w-full px-3 py-2 min-h-[120px] overflow-hidden"
                        {...register('content')}
                    />
                    {formState.errors.content && (
                        <p className="text-red-500 text-sm">
                            {formState.errors.content.message}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="file"
                        className="block font-semibold mb-2"
                    >
                        画像ファイル
                    </label>
                    <input
                        id="file"
                        type="file"
                        accept="image/*"
                        onChange={e => setValue('file', e.target.files as FileList)}
                        className="border-dotted border rounded-md w-full px-3 py-2"
                    />
                    {formState.errors.file && (
                        <p className="text-red-500 text-sm">
                            {formState.errors.file.message}
                        </p>
                    )}

                </div>
                <button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className="bg-sky-700 text-white font-bold w-full px-4 py-2 rounded-md shadow-md hover:bg-sky-300 hover:text-black transition-colors cursor-pointer"
                >
                    投稿
                </button>
            </form>
        </div>
    )
}

export default CreatePostPage