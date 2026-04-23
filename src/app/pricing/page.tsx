import Link from "next/link";
import { CheckCircle, XCircle, ArrowRight, Zap, Shield, TrendingDown } from "lucide-react";

export const metadata = {
  title: "Pricing — Property Deals",
  description: "Transparent, affordable pricing for listing your property. Only R99 per successful sale.",
};

const plans = [
  {
    name: "Private Seller",
    price: "Free",
    subtext: "then R99 on sale",
    highlight: false,
    description: "Perfect for private sellers who want to list without an agent.",
    features: [
      "1 active listing",
      "Up to 10 photos",
      "Basic search visibility",
      "Buyer enquiries via email",
      "R99 fee when property sells",
      "PPRA compliance check",
    ],
    missing: ["Featured listing placement", "Analytics dashboard", "Priority support"],
    cta: "List for Free",
    href: "/list-property",
  },
  {
    name: "Agent Pro",
    price: "R99",
    subtext: "per successful sale only",
    highlight: true,
    description: "For registered estate agents. No monthly fees — only pay when you succeed.",
    features: [
      "Unlimited listings",
      "Up to 30 photos per listing",
      "Premium search placement",
      "Buyer enquiries dashboard",
      "R99 per sale at Deeds Office",
      "Agent profile page",
      "Analytics & reporting",
      "Priority email support",
      "WhatsApp lead alerts",
    ],
    missing: [],
    cta: "Register as Agent",
    href: "/list-property",
  },
  {
    name: "Agency",
    price: "R499",
    subtext: "per month + R99/sale",
    highlight: false,
    description: "For agencies with multiple agents — centralised dashboard and billing.",
    features: [
      "Everything in Agent Pro",
      "Up to 10 agent profiles",
      "Agency branded page",
      "Centralised enquiry management",
      "Bulk listing import (CSV)",
      "API access",
      "Dedicated account manager",
      "Featured agency placement",
    ],
    missing: [],
    cta: "Contact Sales",
    href: "/contact",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-5">
            <TrendingDown className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-amber-700 text-xs font-semibold">LOWEST FEES IN SOUTH AFRICA</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            No monthly subscriptions required. Only pay{" "}
            <span className="text-amber-600 font-semibold">R99</span> when your property actually sells.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border-2 relative flex flex-col ${
                plan.highlight
                  ? "bg-slate-900 border-amber-500 shadow-2xl shadow-amber-500/10"
                  : "bg-white border-slate-100"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-lg font-bold mb-1 ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.highlight ? "text-slate-400" : "text-slate-500"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                    {plan.price}
                  </span>
                  {plan.price !== "Free" && (
                    <span className={`text-sm ${plan.highlight ? "text-amber-400" : "text-amber-600"}`}>/mo</span>
                  )}
                </div>
                <p className={`text-xs mt-1 ${plan.highlight ? "text-amber-400" : "text-amber-600"}`}>
                  {plan.subtext}
                </p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className={plan.highlight ? "text-slate-300" : "text-slate-600"}>{f}</span>
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm opacity-50">
                    <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className={plan.highlight ? "text-slate-400" : "text-slate-400"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.highlight
                    ? "bg-amber-500 hover:bg-amber-400 text-white shadow-lg"
                    : "bg-slate-900 hover:bg-slate-700 text-white"
                }`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {[
            { icon: TrendingDown, title: "No Monthly Fees", desc: "For agent listings — only pay R99 when a sale registers at the Deeds Office." },
            { icon: Shield, title: "PPRA Compliant", desc: "All agents are verified PPRA-registered practitioners. Fully legally compliant." },
            { icon: Zap, title: "Free Buyer Search", desc: "Searching and browsing listings is always completely free for buyers." },
          ].map((g) => (
            <div key={g.title} className="bg-white rounded-2xl p-6 border border-slate-100 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <g.icon className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">{g.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: "When is the R99 fee charged?", a: "Only when your property sale registers at the Deeds Office — meaning you only pay once the deal is done." },
              { q: "Can I list for free as a private seller?", a: "Yes. Private sellers get one free listing. You only pay R99 on a successful sale." },
              { q: "Do I need a PPRA registration to list?", a: "Private sellers do not. Estate agents must be PPRA-registered and verified before listing." },
              { q: "How do I receive buyer enquiries?", a: "Buyers contact you directly via email or phone. All enquiries go straight to you — no middlemen." },
              { q: "What is included in a featured listing?", a: "Featured listings appear at the top of search results and on the homepage carousel for 7 days." },
              { q: "Can I cancel my agency subscription?", a: "Yes, at any time with 30 days notice. You keep all active listings until the billing cycle ends." },
            ].map((item) => (
              <div key={item.q} className="border-b border-slate-100 pb-5">
                <h4 className="font-semibold text-slate-900 mb-2 text-sm">{item.q}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
