import { Phone, Mail, MapPin, Clock, MessageSquare, Building2 } from "lucide-react";

export const metadata = {
  title: "Contact — Property Deals",
  description: "Get in touch with the Property Deals team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Whether you&apos;re an agent, private seller, or just have a question — we&apos;re here to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-5">
            {[
              { icon: Phone, title: "Phone", info: "035 123 4567", sub: "Mon–Fri, 8am–5pm", href: "tel:+27351234567" },
              { icon: Mail, title: "Email", info: "info@propertydeals.co.za", sub: "We reply within 24 hours", href: "mailto:info@propertydeals.co.za" },
              { icon: MapPin, title: "Office", info: "Richards Bay, KZN", sub: "KwaZulu-Natal, South Africa", href: "#" },
              { icon: Clock, title: "Hours", info: "Mon–Fri: 8am–5pm", sub: "Sat: 9am–1pm", href: "#" },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{item.title}</p>
                  <p className="text-slate-900 font-semibold mt-0.5">{item.info}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{item.sub}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-slate-900">Send us a Message</h2>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1.5 block">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Thabo"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1.5 block">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Nkosi"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="thabo@example.co.za"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">Phone (optional)</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="082 123 4567"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">I am a...</label>
                <select className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none text-slate-700">
                  <option>Buyer / Tenant</option>
                  <option>Private Seller</option>
                  <option>Estate Agent</option>
                  <option>Agency Owner</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-white font-semibold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                Send Message
              </button>
              <p className="text-xs text-slate-400 text-center">
                By submitting, you agree to our{" "}
                <a href="/privacy" className="text-amber-600 hover:underline">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
