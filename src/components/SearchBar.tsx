"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, ChevronDown } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const [listingType, setListingType] = useState<"sale" | "rent">("sale");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("type", listingType);
    if (location) params.set("location", location);
    if (propertyType !== "all") params.set("propertyType", propertyType);
    if (priceRange !== "all") params.set("price", priceRange);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-slate-100">
        {(["sale", "rent"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setListingType(type)}
            className={`flex-1 py-3.5 text-sm font-semibold transition-all ${
              listingType === type
                ? "text-amber-600 border-b-2 border-amber-500 bg-amber-50"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            {type === "sale" ? "Buy" : "Rent"}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSearch} className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Location */}
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="City, suburb or area..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-9 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder:text-slate-400"
            />
          </div>

          {/* Property Type */}
          <div className="relative sm:w-44">
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full pl-9 pr-8 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent appearance-none text-slate-700"
            >
              <option value="all">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="townhouse">Townhouse</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Price */}
          <div className="relative sm:w-44">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent appearance-none text-slate-700"
            >
              <option value="all">Any Price</option>
              {listingType === "sale" ? (
                <>
                  <option value="0-500000">Under R500k</option>
                  <option value="500000-1000000">R500k – R1M</option>
                  <option value="1000000-2000000">R1M – R2M</option>
                  <option value="2000000-5000000">R2M – R5M</option>
                  <option value="5000000+">R5M+</option>
                </>
              ) : (
                <>
                  <option value="0-5000">Under R5,000</option>
                  <option value="5000-10000">R5k – R10k</option>
                  <option value="10000-20000">R10k – R20k</option>
                  <option value="20000-50000">R20k – R50k</option>
                  <option value="50000+">R50k+</option>
                </>
              )}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow-md whitespace-nowrap"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
