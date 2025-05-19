import { saveImage } from "@/app/utils/image"
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(
    req: NextRequest
) {
    // フォームの情報を取得
    const formData = await req.formData()
    const title = formData.get('title')
    const content = formData.get('content')
    const userId = formData.get('userId')
    const fileInput = formData.get('file')
    const file = fileInput instanceof File ? fileInput : undefined

    // アクセストークンをヘッダーから取得
    const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '')
    // アクセストークン付きでSupabaseクライアントを生成
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { global: { headers: { Authorization: `Bearer ${accessToken}` } } }
    )

    // console.log("フォームデータ：", formData)

    // 画像保存・URL取得
    const imageUrl = file ? await saveImage(file) : null

    if (file && !imageUrl) {
        return NextResponse.json(
            { error: '画像の保存に失敗しました。' },
            { status: 500 }
        )
    }

    // DB保存
    const { error } = await supabase.from('Posts').insert([{
        title,
        content,
        user_id: userId,
        image_url: imageUrl
    }])

    if (error) {
        console.error('記事作成エラー：', error)
        return NextResponse.json(
            { error: `記事作成処理のDB登録でエラーが発生しました` },
            { status: 500 }
        )
    } else {
        return NextResponse.json(
            { status: 200 }
        )
    }



}
