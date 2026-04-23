import Link from "next/link";
import { CheckCircle, ArrowRight, Home, Users, Building2 } from "lucide-react";

export const metadata = {
  title: "List Your Property — Property Deals",
  description: "List your property on South Africa's most affordable portal.",
};

export default function ListPropertyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">List Your Property</h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Get started in minutes. Free to list — only{" "}
            <span className="text-amber-400 font-semibold">R99</span> when your property sells.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Choose type */}
        <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">I am listing as...</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {[
            { icon: Home, title: "Private Seller", desc: "I'm selling my own property without an estate agent.", fee: "Free + R99 on sale", color: "blue" },
            { icon: Users, title: "Estate Agent", desc: "I'm a registered PPRA agent listing on behalf of clients.", fee: "Free + R99 per sale", color: "amber" },
            { icon: Building2, title: "Agency", desc: "I represent a property agency with multiple agents.", fee: "R499/mo + R99/sale", color: "purple" },
          ].map((item) => (
            <button
              key={item.title}
              className="group p-6 bg-white rounded-2xl border-2 border-slate-100 hover:border-amber-400 text-left transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">{item.desc}</p>
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full">
                {item.fee}
              </span>
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Create Your Listing</h2>
          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">Property Title</label>
                <input type="text" placeholder="e.g. Modern 3-Bedroom House in Richards Bay" className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">Asking Price</label>
                <input type="text" placeholder="R 0,000,000" className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">Listing Type</label>
                <select className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none">
                  <option>For Sale</option>
                  <option>To Rent</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">Property Type</label>
                <select className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none">
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Townhouse</option>
                  <option>Land</option>
                  <option>Commercial</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Full Address</label>
              <input type="text" placeholder="12 Harbour Drive, Meerensee, Richards Bay, KZN" className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">Bedrooms</label>
                <input type="number" min="0" placeholder="3" className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">Bathrooms</label>
                <input type="number" min="0" placeholder="2" className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">Parking</label>
                <input type="number" min="0" placeholder="2" className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Description</label>
              <textarea rows={4} placeholder="Describe your property..." className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Photos</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-amber-300 transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                  <Home className="w-5 h-5 text-slate-400" />
                </div>
                <p className="text-sm text-slate-500">Drop photos here or <span className="text-amber-600 font-medium">browse</span></p>
                <p className="text-xs text-slate-400 mt-1">JPG, PNG up to 10MB each — max 30 photos</p>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-start gap-2 mb-5">
                <input type="checkbox" id="agree" className="mt-0.5 accent-amber-500" />
                <label htmlFor="agree" className="text-xs text-slate-500">
                  I confirm this is accurate information and I agree to the{" "}
                  <Link href="/terms" className="text-amber-600 hover:underline">Terms of Service</Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-amber-600 hover:underline">Privacy Policy</Link>.
                </label>
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold py-3.5 rounded-xl transition-all shadow-sm">
                Submit Listing <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-slate-400 text-center mt-3">
                Free to list — only pay <span className="text-amber-600 font-medium">R99</span> when your property sells
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
