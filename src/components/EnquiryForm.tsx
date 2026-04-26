'use client'

import { useActionState } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { submitEnquiry } from '@/app/actions'

const inputCls =
  'w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400'

export function EnquiryForm({
  propertyId,
  propertyTitle,
}: {
  propertyId: string
  propertyTitle: string
}) {
  const action = submitEnquiry.bind(null, propertyId)
  const [state, formAction, pending] = useActionState(action, { message: '', ok: false })

  if (state.ok) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <CheckCircle className="w-12 h-12 text-emerald-500 mb-3" />
        <p className="font-semibold text-slate-900 mb-1">Enquiry Sent!</p>
        <p className="text-sm text-slate-500">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-3">
      <input name="name" type="text" placeholder="Your name" required className={inputCls} />
      <input name="email" type="email" placeholder="Your email" required className={inputCls} />
      <input name="phone" type="tel" placeholder="Your phone" className={inputCls} />
      <textarea
        name="message"
        rows={3}
        required
        defaultValue={`Hi, I'm interested in ${propertyTitle}. Please contact me.`}
        className={`${inputCls} resize-none`}
      />

      {state.message && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all shadow-sm"
      >
        {pending ? 'Sending…' : 'Send Enquiry'}
      </button>
    </form>
  )
}
