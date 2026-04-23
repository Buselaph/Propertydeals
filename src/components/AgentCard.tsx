import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Star, Building2 } from "lucide-react";
import { type Agent } from "@/lib/data";

interface Props {
  agent: Agent;
}

export default function AgentCard({ agent }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start gap-4">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
          <Image src={agent.photo} alt={agent.name} fill className="object-cover" unoptimized />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">{agent.name}</h3>
          <div className="flex items-center gap-1 mt-0.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <p className="text-xs text-slate-500 truncate">{agent.agency}</p>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold text-slate-700">{agent.rating}</span>
            </div>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">{agent.listings} listings</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
        <a
          href={`tel:${agent.phone.replace(/\s/g, "")}`}
          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-2.5 rounded-xl transition-all"
        >
          <Phone className="w-3.5 h-3.5" />
          Call
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium bg-amber-50 hover:bg-amber-100 text-amber-700 px-3 py-2.5 rounded-xl transition-all"
        >
          <Mail className="w-3.5 h-3.5" />
          Email
        </a>
        <Link
          href={`/agents/${agent.id}`}
          className="flex-1 flex items-center justify-center text-xs font-medium bg-slate-900 hover:bg-slate-700 text-white px-3 py-2.5 rounded-xl transition-all"
        >
          View
        </Link>
      </div>
    </div>
  );
}
