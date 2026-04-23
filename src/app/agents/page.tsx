import { Search, Star, Shield, MapPin } from "lucide-react";
import AgentCard from "@/components/AgentCard";
import { agents } from "@/lib/data";

export const metadata = {
  title: "Find an Agent — Property Deals",
  description: "Browse PPRA-verified property agents across South Africa.",
};

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/20 rounded-full px-4 py-1.5 mb-5">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-300 text-xs font-semibold tracking-wide">ALL AGENTS ARE PPRA-VERIFIED</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Find the Right Agent</h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
            Every agent on Property Deals is PPRA-registered and verified. Browse by area, rating, or agency.
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, area or agency..."
              className="w-full pl-11 pr-4 py-3.5 text-sm bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: Shield, label: "Verified Agents", value: "850+" },
            { icon: Star, label: "Avg. Rating", value: "4.8/5" },
            { icon: MapPin, label: "Areas Covered", value: "45+" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 text-center">
              <s.icon className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              <p className="text-xl font-bold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900">{agents.length} agents found</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {agents.map((a) => (
            <AgentCard key={a.id} agent={a} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Are You an Estate Agent?</h3>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Join Property Deals and list your properties with South Africa&apos;s most affordable portal.
            Only <span className="text-amber-400 font-semibold">R99 per successful sale</span>.
          </p>
          <a
            href="/list-property"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-xl transition-all"
          >
            Register as Agent
          </a>
        </div>
      </div>
    </div>
  );
}
