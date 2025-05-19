"use client"

import { supabase } from "@/app/features/auth/lib/supabaseClient";
import { useAuthStore } from "@/app/features/auth/store/authStore";
import { Post } from "@/app/types/post";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

async function fetchPosts() {
    // supabaseからトークン情報を取得する
    const { data: sessionData } = await supabase.auth.getSession()
    const accessToken = sessionData.session?.access_token
    if (!accessToken) redirect('/auth/login')
    const res = await fetch(`/api/posts`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    if (!res.ok) throw new Error("データ取得処理時にエラーが発生しました。")
    const json = await res.json()
    // console.log(json)
    return json.posts
}
export default function PostListPage() {
    // Zustandからセッション情報を取得
    const { user, isAuthenticated, isLoading: authIsLoading, checkAuth } = useAuthStore()

    useEffect(() => {
        checkAuth()
    }, [checkAuth])
    const { data, isLoading, error } = useQuery<Post[]>({
        queryKey: ['posts-list'],
        queryFn: () => fetchPosts()
    })
    if (authIsLoading) return <div>Loading...</div>
    if (!user || !isAuthenticated) redirect('/auth/login') // 未ログインはログイン画面に遷移

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>エラーが発生しました。</div>

    return (
        <>
            <main className="flex flex-wrap justify-center items-center md:mt-24 mt-16 p-8">
                <h2 className="text-center w-full font-bold text-2xl mb-8">記事一覧</h2>
                {data?.map(post => (
                    <div
                        key={post.id}
                        className="flex justify-center w-full p-4 mb-4 md:w-1/2 lg:w-1/3"
                    >
                        <Link
                            href={`/posts/${post.id}`}
                            className="cursor-pointer shadow-gray-300 shadow-lg duration-300 hover:translate-y-2 hover:shadow-none w-full max-w-sm"
                        >
                            <div className="">
                                <Image
                                    src={post.image_url}
                                    alt={post.title}
                                    width={400}
                                    height={320}
                                    className="rounded-md h-80 object-cover"
                                />
                            </div>
                            <div className="p-4 bg-amber-100 rounded-b-md">
                                <h2 className="text-lg font-bold truncate mb-2">{post.title}</h2>
                                <p className="text-sm line-clamp-2 text-slate-800">{post.content}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </main>
        </>
    )
}
