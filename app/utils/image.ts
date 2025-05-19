import { supabase } from "../features/auth/lib/supabaseClient"

export async function saveImage(file: File): Promise<string | null> {
    const fileName = `${Date.now()}_${file.name}`   // ファイル名生成（日付_ファイル名）
    const { error } = await supabase.storage
        .from('nextjs-postimage-bucket')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        })
    if (error) {
        console.error('画像保存エラー：', error)
        return null
    } else {
        const { data: publicUrlData } = supabase.storage
            .from('nextjs-postimage-bucket')
            .getPublicUrl(fileName)
        return publicUrlData.publicUrl
    }
}