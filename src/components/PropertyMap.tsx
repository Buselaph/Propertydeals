'use client'

import { useState } from 'react'
import { MapPin, ExternalLink } from 'lucide-react'

export function PropertyMap({
  address,
  suburb,
  city,
  province,
}: {
  address: string
  suburb: string
  city: string
  province: string
}) {
  const [loaded, setLoaded] = useState(false)
  const fullAddress = `${address}, ${suburb}, ${city}, ${province}, South Africa`
  const encodedAddress = encodeURIComponent(fullAddress)
  const embedSrc = `https://maps.google.com/maps?q=${encodedAddress}&output=embed&hl=en&z=15`
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-500" />
          <h2 className="text-lg font-semibold text-slate-900">Location</h2>
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-amber-600 transition-colors"
        >
          Open in Google Maps <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="px-6 py-3 bg-slate-50 border-b border-slate-100">
        <p className="text-sm text-slate-600 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          {fullAddress}
        </p>
      </div>

      <div className="relative h-72 bg-slate-100">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <MapPin className="w-8 h-8 animate-bounce" />
              <p className="text-sm">Loading map…</p>
            </div>
          </div>
        )}
        <iframe
          src={embedSrc}
          title={`Map of ${fullAddress}`}
          className={`w-full h-full border-0 transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  )
}
