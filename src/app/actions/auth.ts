'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

export async function signUp(_prev: { message: string; ok: boolean }, formData: FormData) {
  const email = (formData.get('email') as string)?.trim()
  const password = formData.get('password') as string
  const name = (formData.get('name') as string)?.trim()

  if (!email || !password || !name) {
    return { message: 'All fields are required.', ok: false }
  }
  if (password.length < 8) {
    return { message: 'Password must be at least 8 characters.', ok: false }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error) return { message: error.message, ok: false }
  return { message: 'Check your email for a confirmation link.', ok: true }
}

export async function signIn(_prev: { message: string; ok: boolean }, formData: FormData) {
  const email = (formData.get('email') as string)?.trim()
  const password = formData.get('password') as string

  if (!email || !password) {
    return { message: 'Email and password are required.', ok: false }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return { message: 'Invalid email or password.', ok: false }

  redirect('/')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
