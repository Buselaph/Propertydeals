'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { Home, AlertCircle, CheckCircle } from 'lucide-react'
import { signIn } from '@/app/actions/auth'

const inputCls =
  'w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(signIn, { message: '', ok: false })

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-slate-900 font-bold text-lg tracking-tight">
              PROPERTY<span className="text-amber-500 ml-1">DEALS</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <form action={formAction} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Email address</label>
              <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputCls} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-medium text-slate-500">Password</label>
                <Link href="/forgot-password" className="text-xs text-amber-600 hover:underline">Forgot password?</Link>
              </div>
              <input name="password" type="password" required autoComplete="current-password" placeholder="••••••••" className={inputCls} />
            </div>

            {state.message && (
              <div className={`flex items-center gap-2 text-sm rounded-xl px-4 py-3 ${
                state.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
              }`}>
                {state.ok
                  ? <CheckCircle className="w-4 h-4 shrink-0" />
                  : <AlertCircle className="w-4 h-4 shrink-0" />}
                {state.message}
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all shadow-sm mt-2"
            >
              {pending ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-amber-600 font-medium hover:underline">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
