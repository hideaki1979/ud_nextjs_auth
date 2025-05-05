import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../lib/supabaseClient'

type User = {
    id: string;
    email: string;
    username?: string;
}

type AuthState = {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    signIn: (email: string, password: string) => Promise<{ error: string | null }>
    signUp: (email: string, password: string, username: string) => Promise<{ error: string | null }>
    signOut: () => Promise<void>
    checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isLoading: true,
            isAuthenticated: false,
            signIn: async (email, password) => {
                try {
                    const { error } = await supabase.auth.signInWithPassword({
                        email,
                        password
                    })

                    if (error) {
                        return { error: error.message }
                    }

                    await get().checkAuth()
                    return { error: null }
                } catch (error) {
                    console.error('サインインエラー：', error)
                    return { error: '認証処理中にエラーが発生しました' }
                }
            },
            signUp: async (email, password, username) => {
                try {
                    const { error: signUpError, data } = await supabase
                        .auth.signUp({
                            email,
                            password,
                            options: {
                                data: { username }
                            }
                        })
                    if (signUpError) {
                        return { error: signUpError.message }
                    }

                    if (data.user) {
                        const { error: userError } = await supabase
                            .from('Users')
                            .insert([{
                                id: data.user.id,
                                username,
                                email
                            }])
                        if (userError) {
                            if (userError.message.includes('duplicate key value violates unique constraint')) {
                                return { error: '既にメールアドレス登録されているユーザーです。' }
                            }
                            return { error: userError.message }
                        }
                    }
                    return { error: null }
                } catch (error) {
                    console.error('サインアップエラー：', error)
                    return { error: '登録処理中にエラーが発生しました' }
                }
            },

            signOut: async () => {
                await supabase.auth.signOut()
                set({ user: null, isAuthenticated: false })
            },

            checkAuth: async () => {
                set({ isLoading: true })
                try {
                    const { data } = await supabase.auth.getSession()

                    if (data.session) {
                        const { data: userData } = await supabase
                            .from('Users')
                            .select('*')
                            .eq('id', data.session.user.id)
                            .single()

                        set({
                            user: {
                                id: data.session.user.id,
                                email: data.session.user.email!,
                                username: userData?.username
                            },
                            isAuthenticated: true
                        })
                    } else {
                        set({ user: null, isAuthenticated: false })
                    }
                } catch (error) {
                    console.error('認証確認エラー：', error)
                    set({ user: null, isAuthenticated: false })
                } finally {
                    set({ isLoading: false })
                }
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
        }
    )
)

