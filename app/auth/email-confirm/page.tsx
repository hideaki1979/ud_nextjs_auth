'use client'

import Button from '@/app/features/auth/components/Button'
import { useRouter } from 'next/navigation'
import React from 'react'

const ConfirmEmail = () => {
    const router = useRouter()
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <div className='max-w-xl w-full bg-gray-200 rounded-md shadow-sm pb-8'>
                <h2 className='text-2xl font-semibold text-center my-8'>
                    メール確認
                </h2>
                <div className='px-8'>
                    <p className='text-sm text-gray-700'>
                        メールアドレスに確認メールを送付しました。<br />
                        メール内のリンクをクリックして、<br />
                        アカウント確認をして下さい。
                    </p>
                </div>
                <div className='flex flex-col w-full items-center'>
                    <Button
                        colorClass='bg-blue-500 hover:bg-blue-700 duration-500'
                        type='button'
                        onClick={() => router.push('/auth/login')}
                    >
                        ログインへ
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmEmail