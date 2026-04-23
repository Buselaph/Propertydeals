import Link from "next/link";
import { Home, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-white font-bold text-base">PROPERTY</span>
                <span className="text-amber-400 font-bold text-base ml-1">DEALS</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              South Africa&apos;s most affordable property platform. Find your dream home or list your property — no hidden fees, no surprises.
            </p>
            <div className="flex items-center gap-3">
              {["FB", "X", "IG", "LI"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-amber-500 flex items-center justify-center transition-all text-xs font-bold text-slate-300 hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/properties?type=sale", label: "Properties for Sale" },
                { href: "/properties?type=rent", label: "Properties to Rent" },
                { href: "/agents", label: "Find an Agent" },
                { href: "/pricing", label: "Our Pricing" },
                { href: "/list-property", label: "List Your Property" },
                { href: "/new-developments", label: "New Developments" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-amber-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/bond-calculator", label: "Bond Calculator" },
                { href: "/affordability-calculator", label: "Affordability Calculator" },
                { href: "/transfer-costs", label: "Transfer Cost Calculator" },
                { href: "/guides", label: "Buyer's Guide" },
                { href: "/guides/sell", label: "Seller's Guide" },
                { href: "/market-trends", label: "Market Trends" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-amber-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span>Richards Bay, KwaZulu-Natal, South Africa</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+27351234567" className="hover:text-amber-400 transition-colors">
                  035 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:info@propertydeals.co.za" className="hover:text-amber-400 transition-colors">
                  info@propertydeals.co.za
                </a>
              </li>
            </ul>

            <div className="mt-6 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-xs text-amber-300 font-medium">Listing Fee: Only R99/sale</p>
              <p className="text-xs text-slate-400 mt-0.5">Cheaper than any competitor</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 Property Deals (Pty) Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/popia" className="hover:text-slate-300 transition-colors">POPIA</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
