'use client'

import Link from "next/link";
import { supabase } from "./features/auth/lib/supabaseClient";
import Button from "./features/auth/components/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const handleBlogPost = async () => {
    const { data } = await supabase.auth.getSession()
    console.log('セッション情報：', data)
    if (data.session) {
      router.push('/create-post')
    } else {
      router.push('/auth/login')
    }

  }

  return (
    <main className="flex flex-col items-center p-24 min-h-screen">
      <h2 className="font-semibold mb-5 text-2xl">Hello RHF & Zod</h2>
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
      <Button
        colorClass="bg-purple-600"
        type="button"
        onClick={async () => await supabase.auth.signOut()}
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
    </main>
  );
}
