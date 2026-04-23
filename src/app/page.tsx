import Link from "next/link";
import Image from "next/image";
import {
  TrendingDown,
  Shield,
  Zap,
  Star,
  ArrowRight,
  CheckCircle,
  Users,
  Home,
  MapPin,
} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import AgentCard from "@/components/AgentCard";
import { properties, agents } from "@/lib/data";

const stats = [
  { label: "Active Listings", value: "12,400+", icon: Home },
  { label: "Verified Agents", value: "850+", icon: Users },
  { label: "Cities Covered", value: "45+", icon: MapPin },
  { label: "Avg. Fee Saving", value: "50%", icon: TrendingDown },
];

const features = [
  {
    icon: TrendingDown,
    title: "Lowest Fees in SA",
    description:
      "Only R99 per successful sale — half the price of Property24. Free basic listings for buyers and private sellers.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Shield,
    title: "Verified Agents",
    description:
      "Every agent on our platform is PPRA-registered and verified. Browse with confidence.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Zap,
    title: "Instant Alerts",
    description:
      "Get notified the moment a new property matching your criteria is listed. Never miss a deal.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const steps = [
  {
    step: "01",
    title: "Search or List",
    description: "Browse thousands of verified listings or list your property in under 5 minutes.",
  },
  {
    step: "02",
    title: "Connect",
    description: "Contact the agent or private seller directly — no middlemen, no gatekeeping.",
  },
  {
    step: "03",
    title: "Close the Deal",
    description: "Agree on terms and pay only R99 when the sale registers at the Deeds Office.",
  },
];

const popularAreas = [
  { city: "Richards Bay", count: 342, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=250&fit=crop" },
  { city: "Durban", count: 1840, image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop" },
  { city: "Cape Town", count: 2310, image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&h=250&fit=crop" },
  { city: "Johannesburg", count: 3120, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop" },
  { city: "Pretoria", count: 980, image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&h=250&fit=crop" },
  { city: "Port Elizabeth", count: 720, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=250&fit=crop" },
];

const featuredProperties = properties.filter((p) => p.featured).slice(0, 4);

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop"
            alt="Hero property"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/40" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 rounded-full px-4 py-1.5 mb-6">
              <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-300 text-xs font-semibold tracking-wide">
                FEES 50% LOWER THAN PROPERTY24
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Find Your Perfect{" "}
              <span className="text-amber-400">Property Deal</span>
              <br />in South Africa
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl mb-10 max-w-2xl leading-relaxed">
              Buy, sell, or rent with South Africa&apos;s most affordable property portal.
              Only{" "}
              <span className="text-amber-400 font-semibold">R99 per successful sale</span>{" "}
              — no monthly fees, no surprises.
            </p>

            <div className="max-w-2xl">
              <SearchBar />
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6">
              {["12,400+ listings", "850+ verified agents", "45 cities", "Free to search"].map((s) => (
                <div key={s} className="flex items-center gap-1.5 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-amber-400" />
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-slate-400">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-amber-600 text-sm font-semibold tracking-wide uppercase mb-2">Featured Properties</p>
              <h2 className="text-3xl font-bold text-slate-900">Hand-Picked Listings</h2>
            </div>
            <Link href="/properties" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-amber-600 transition-colors">
              View all listings <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Property Deals */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-amber-600 text-sm font-semibold tracking-wide uppercase mb-2">Why Choose Us</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">A Better Way to Deal in Property</h2>
            <p className="text-slate-500 text-base">
              We built Property Deals because the existing platforms charge too much and offer too little.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-8 rounded-2xl border border-slate-100 hover:border-amber-200 hover:shadow-lg transition-all">
                <div className={`w-12 h-12 rounded-2xl ${f.bg} flex items-center justify-center mb-5`}>
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>

          {/* Fee comparison */}
          <div className="mt-14 bg-slate-900 rounded-3xl p-8 sm:p-10">
            <h3 className="text-white font-bold text-xl mb-2 text-center">Fee Comparison</h3>
            <p className="text-slate-400 text-sm text-center mb-8">See how we stack up against the competition</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 text-xs uppercase tracking-wider">
                    <th className="text-left py-3 pr-6">Platform</th>
                    <th className="text-center py-3 px-4">Listing Fee</th>
                    <th className="text-center py-3 px-4">Success Fee</th>
                    <th className="text-center py-3 px-4">Monthly Sub</th>
                    <th className="text-center py-3 px-4">Free Search</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    { name: "Property Deals", listing: "Free", success: "R99/sale", monthly: "None", search: true, highlight: true },
                    { name: "Property24", listing: "Varies", success: "R199/sale", monthly: "R699+/mo", search: true, highlight: false },
                    { name: "Private Property", listing: "Varies", success: "R199+", monthly: "R549+/mo", search: true, highlight: false },
                    { name: "MyProperty", listing: "R299+", success: "R199+", monthly: "R499+/mo", search: true, highlight: false },
                  ].map((row) => (
                    <tr key={row.name} className={row.highlight ? "text-white" : "text-slate-400"}>
                      <td className="py-4 pr-6 font-medium flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${row.highlight ? "bg-amber-400" : "bg-transparent"}`} />
                        {row.name}
                      </td>
                      <td className={`text-center py-4 px-4 ${row.highlight ? "text-emerald-400 font-semibold" : ""}`}>{row.listing}</td>
                      <td className={`text-center py-4 px-4 ${row.highlight ? "text-emerald-400 font-semibold" : ""}`}>{row.success}</td>
                      <td className={`text-center py-4 px-4 ${row.highlight ? "text-emerald-400 font-semibold" : ""}`}>{row.monthly}</td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className={`w-4 h-4 mx-auto ${row.search ? "text-emerald-400" : "text-slate-600"}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Areas */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-amber-600 text-sm font-semibold tracking-wide uppercase mb-2">Explore</p>
              <h2 className="text-3xl font-bold text-slate-900">Popular Areas</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularAreas.map((area) => (
              <Link
                key={area.city}
                href={`/properties?location=${area.city}`}
                className="group relative rounded-2xl overflow-hidden h-40 bg-slate-200 block"
              >
                <Image
                  src={area.image}
                  alt={area.city}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-3">
                  <p className="text-white font-semibold text-sm">{area.city}</p>
                  <p className="text-slate-300 text-xs">{area.count} listings</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-amber-600 text-sm font-semibold tracking-wide uppercase mb-2">Simple Process</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How Property Deals Works</h2>
            <p className="text-slate-500">We&apos;ve made buying, selling, and renting as simple and affordable as possible.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-20 h-20 rounded-3xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-amber-600">{s.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/list-property"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg"
            >
              List Your Property Today <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="mt-3 text-xs text-slate-400">Free to list — only pay R99 when you sell</p>
          </div>
        </div>
      </section>

      {/* Top Agents */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-amber-600 text-sm font-semibold tracking-wide uppercase mb-2">Our Agents</p>
              <h2 className="text-3xl font-bold text-slate-900">Top Rated Agents</h2>
            </div>
            <Link href="/agents" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-amber-600 transition-colors">
              View all agents <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {agents.map((a) => (
              <AgentCard key={a.id} agent={a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/20 rounded-full px-4 py-1.5 mb-6">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-amber-300 text-xs font-semibold">JOIN 850+ VERIFIED AGENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Ready to List Your Property?</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Create your free listing today. Only pay{" "}
              <span className="text-amber-400 font-semibold">R99</span> when your property sells —
              the lowest success fee in South Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/list-property" className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg">
                List for Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-all border border-white/20">
                See All Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
