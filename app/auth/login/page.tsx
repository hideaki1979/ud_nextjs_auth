'use client'
import Button from '@/app/features/auth/components/Button'
import InputField from '@/app/features/auth/components/InputField'
import { useLoginForm } from '@/app/features/auth/hooks/useLoginForm'
import Link from 'next/link'
import React from 'react'

const Login = () => {
    const { form, onSubmit, err } = useLoginForm()

    return (
        <div className='max-w-sm mx-auto my-14'>
            <h2 className='text-center text-3xl font-semibold mb-4'>ログイン</h2>
            <p className='text-red-500 text-sm'>
                {err}
            </p>

            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                        ログイン
                    </Button>
                </div>
            </form>
            <p className='mt-4 text-center'>アカウント未登録の方は<Link href="/auth/signup" className='text-blue-500 font-semibold'>こちらから</Link></p>
        </div>
    )
}

export default Login