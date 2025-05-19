'use client'

import Link from "next/link";
import { supabase } from "./features/auth/lib/supabaseClient";
import Button from "./features/auth/components/Button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./features/auth/store/authStore";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, signOut, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleBlogPost = async () => {
    const { data } = await supabase.auth.getSession()
    console.log('セッション情報：', data)
    if (data.session) {
      router.push('/posts/create-post')
    } else {
      router.push('/auth/login')
    }

  }

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading</div>
  }

  return (
    <main className="flex flex-col items-center p-24 min-h-screen">
      <h2 className="font-semibold mb-5 text-2xl">Hello RHF & Zod</h2>
      {!isAuthenticated ? (
        <div className="flex gap-5">
          <Link
            href={"/auth/signup"}
            className="bg-red-500 py-3 px-4 rounded-md font-bold text-white hover:bg-red-700 duration-300"
          >
            新規登録
          </Link>
          <Link
            href={"/auth/login"}
            className="bg-blue-500 py-3 px-4 rounded-md font-bold text-white hover:bg-blue-700 duration-300"
          >
            ログイン
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-xl">ユーザー名：{user?.username}さん</p>
          <Button
            colorClass="bg-purple-600"
            type="button"
            onClick={signOut}
          >
            ログアウト
          </Button>
          <Button
            colorClass="bg-green-400 mt-4"
            type="button"
            onClick={handleBlogPost}
          >
            ブログ投稿
          </Button>
        </div>
      )}
    </main>
  );
}
