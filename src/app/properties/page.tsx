"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Grid3X3, List, Search, X, ChevronDown } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import { properties, type ListingType, type PropertyType } from "@/lib/data";
import { Suspense } from "react";

function PropertiesContent() {
  const searchParams = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    type: (searchParams.get("type") as ListingType) || "sale",
    location: searchParams.get("location") || "",
    propertyType: (searchParams.get("propertyType") as PropertyType | "all") || "all",
    minBeds: "any",
    maxPrice: "any",
    sortBy: "newest",
  });

  const filtered = useMemo(() => {
    let result = [...properties];

    if (filters.type) result = result.filter((p) => p.listingType === filters.type);
    if (filters.location) {
      const q = filters.location.toLowerCase();
      result = result.filter(
        (p) =>
          p.city.toLowerCase().includes(q) ||
          p.suburb.toLowerCase().includes(q) ||
          p.province.toLowerCase().includes(q)
      );
    }
    if (filters.propertyType !== "all") result = result.filter((p) => p.propertyType === filters.propertyType);
    if (filters.minBeds !== "any") result = result.filter((p) => p.bedrooms >= parseInt(filters.minBeds));
    if (filters.maxPrice !== "any") {
      const max = parseInt(filters.maxPrice);
      result = result.filter((p) => p.price <= max);
    }
    if (filters.sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (filters.sortBy === "price-desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [filters]);

  const update = (key: string, value: string) => setFilters((f) => ({ ...f, [key]: value }));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Properties{" "}
                {filters.type === "sale" ? "For Sale" : "To Rent"}
              </h1>
              <p className="text-sm text-slate-500">{filtered.length} listings found</p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Search input */}
              <div className="relative flex-1 sm:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search location..."
                  value={filters.location}
                  onChange={(e) => update("location", e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                {filters.location && (
                  <button onClick={() => update("location", "")} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                )}
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={(e) => update("sortBy", e.target.value)}
                  className="pl-3 pr-8 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none appearance-none text-slate-700"
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low–High</option>
                  <option value="price-desc">Price: High–Low</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-xl border transition-all ${
                  showFilters ? "bg-amber-50 border-amber-300 text-amber-700" : "bg-white border-slate-200 text-slate-700"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>

              <div className="hidden sm:flex gap-1 border border-slate-200 rounded-xl overflow-hidden bg-white">
                <button onClick={() => setView("grid")} className={`p-2 ${view === "grid" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"}`}>
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button onClick={() => setView("list")} className={`p-2 ${view === "list" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"}`}>
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters row */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-3">
              {/* Listing Type */}
              <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
                {(["sale", "rent"] as ListingType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => update("type", t)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                      filters.type === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                    }`}
                  >
                    {t === "sale" ? "For Sale" : "To Rent"}
                  </button>
                ))}
              </div>

              {/* Property Type */}
              <div className="relative">
                <select
                  value={filters.propertyType}
                  onChange={(e) => update("propertyType", e.target.value)}
                  className="pl-3 pr-8 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none appearance-none text-slate-700"
                >
                  <option value="all">All Types</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Min Beds */}
              <div className="relative">
                <select
                  value={filters.minBeds}
                  onChange={(e) => update("minBeds", e.target.value)}
                  className="pl-3 pr-8 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none appearance-none text-slate-700"
                >
                  <option value="any">Any Beds</option>
                  <option value="1">1+ Bed</option>
                  <option value="2">2+ Beds</option>
                  <option value="3">3+ Beds</option>
                  <option value="4">4+ Beds</option>
                  <option value="5">5+ Beds</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Max Price */}
              <div className="relative">
                <select
                  value={filters.maxPrice}
                  onChange={(e) => update("maxPrice", e.target.value)}
                  className="pl-3 pr-8 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none appearance-none text-slate-700"
                >
                  <option value="any">Max Price</option>
                  {filters.type === "sale" ? (
                    <>
                      <option value="1000000">R1M</option>
                      <option value="2000000">R2M</option>
                      <option value="3000000">R3M</option>
                      <option value="5000000">R5M</option>
                    </>
                  ) : (
                    <>
                      <option value="5000">R5,000/mo</option>
                      <option value="10000">R10,000/mo</option>
                      <option value="20000">R20,000/mo</option>
                      <option value="30000">R30,000/mo</option>
                    </>
                  )}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              <button
                onClick={() => setFilters({ type: "sale", location: "", propertyType: "all", minBeds: "any", maxPrice: "any", sortBy: "newest" })}
                className="px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-all"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No properties found</h3>
            <p className="text-slate-500 text-sm">Try adjusting your filters or search in a different area.</p>
          </div>
        ) : (
          <div className={`grid gap-5 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense>
      <PropertiesContent />
    </Suspense>
  );
}
