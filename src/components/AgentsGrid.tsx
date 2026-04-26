'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import AgentCard from '@/components/AgentCard'
import type { Agent } from '@/lib/data'

export function AgentsGrid({ agents }: { agents: Agent[] }) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? agents.filter((a) => {
        const q = query.toLowerCase()
        return (
          a.name.toLowerCase().includes(q) ||
          a.area.toLowerCase().includes(q) ||
          a.agency.toLowerCase().includes(q)
        )
      })
    : agents

  return (
    <>
      <div className="max-w-md mx-auto relative mb-0">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, area or agency..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 text-sm bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-lg"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            {filtered.length} agent{filtered.length !== 1 ? 's' : ''} found
            {query && <span className="text-slate-400 font-normal text-sm ml-2">for &ldquo;{query}&rdquo;</span>}
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500">No agents match your search. Try a different name or area.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((a) => (
              <AgentCard key={a.id} agent={a} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
