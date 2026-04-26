'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { Home, AlertCircle, CheckCircle } from 'lucide-react'
import { signUp } from '@/app/actions/auth'

const inputCls =
  'w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900'

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signUp, { message: '', ok: false })

  if (state.ok) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center bg-white rounded-2xl border border-slate-100 shadow-sm p-10">
          <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Check your email</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">{state.message}</p>
          <Link href="/login" className="text-amber-600 font-medium hover:underline text-sm">
            Back to Sign In
          </Link>
        </div>
      </div>
    )
  }

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
          <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="text-slate-500 text-sm mt-1">Free to join — only pay R99 when you sell</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <form action={formAction} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Full name</label>
              <input name="name" type="text" required autoComplete="name" placeholder="Sipho Dlamini" className={inputCls} />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Email address</label>
              <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputCls} />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Password</label>
              <input name="password" type="password" required autoComplete="new-password" placeholder="At least 8 characters" className={inputCls} />
            </div>

            {state.message && (
              <div className="flex items-center gap-2 text-sm bg-red-50 text-red-600 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {state.message}
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all shadow-sm mt-2"
            >
              {pending ? 'Creating account…' : 'Create Account'}
            </button>

            <p className="text-xs text-slate-400 text-center">
              By signing up you agree to our{' '}
              <Link href="/terms" className="text-amber-600 hover:underline">Terms</Link> and{' '}
              <Link href="/privacy" className="text-amber-600 hover:underline">Privacy Policy</Link>.
            </p>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-amber-600 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
