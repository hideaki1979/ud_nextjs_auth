'use client'
import Button from '@/app/features/auth/components/Button'
import InputField from '@/app/features/auth/components/InputField'
import { useSignupForm } from '@/app/features/auth/hooks/useSignupForm'
import Link from 'next/link'
import React from 'react'

const Signup = () => {
    const { form, onSubmit, err } = useSignupForm()

    return (
        <div className='max-w-sm mx-auto my-14'>
            <h2 className='text-center text-3xl font-semibold mb-4'>アカウント作成</h2>
            <p className='text-red-500'>
                {err}
            </p>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <InputField
                    name="username"
                    label="ユーザー名"
                    type="input"
                    placeholder="ユーザー名"
                    register={form.register}
                />
                {form.formState.errors &&
                    <p className='text-red-500'>
                        {form.formState.errors.username?.message}
                    </p>
                }
                <InputField
                    name="email"
                    label="メールアドレス"
                    type="email"
                    placeholder="メールアドレス"
                    register={form.register}
                />
                {form.formState.errors &&
                    <p className='text-red-500'>
                        {form.formState.errors.email?.message}
                    </p>
                }
                <InputField
                    name="password"
                    label="パスワード"
                    type="password"
                    placeholder="パスワード"
                    register={form.register}
                />
                {form.formState.errors &&
                    <p className='text-red-500'>
                        {form.formState.errors.password?.message}
                    </p>
                }
                <div>
                    <Button
                        type="submit"
                        colorClass='bg-blue-500 hover:bg-blue-700 w-full'
                    >
                        新規登録
                    </Button>
                </div>
            </form>
            <p className='mt-4 text-center'>アカウント登録済の方は<Link href="/auth/login" className='text-blue-500 font-semibold'>ログイン画面へ</Link></p>
        </div>
    )
}

export default Signup