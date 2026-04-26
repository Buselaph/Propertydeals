import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Bed, Bath, Car, Maximize, MapPin, ArrowLeft,
  Phone, Mail, CheckCircle, Star, Share2, Heart, Building2
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { type Property, type Agent } from "@/lib/data";
import { formatPrice, formatArea } from "@/lib/utils";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PropertyMap } from "@/components/PropertyMap";

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [{ data: property }, { data: relatedData }] = await Promise.all([
    supabase.from("properties").select("*, agents(*)").eq("id", id).single(),
    supabase.from("properties").select("*").neq("id", id).limit(3),
  ]);

  if (!property) notFound();

  const agent = property.agents as Agent | null;
  const related = (relatedData ?? []) as Property[];
  const isRent = (property as Property).listing_type === "rent";

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Back nav */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/properties" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to listings
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="rounded-2xl overflow-hidden bg-slate-200 aspect-[16/9] relative">
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover"
                unoptimized
                priority
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${isRent ? "bg-blue-600 text-white" : "bg-emerald-600 text-white"}`}>
                  {isRent ? "TO RENT" : "FOR SALE"}
                </span>
                {property.new_development && (
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-500 text-white">NEW DEVELOPMENT</span>
                )}
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="w-9 h-9 bg-white/90 hover:bg-white rounded-xl flex items-center justify-center shadow-sm transition-all">
                  <Heart className="w-4 h-4 text-slate-600" />
                </button>
                <button className="w-9 h-9 bg-white/90 hover:bg-white rounded-xl flex items-center justify-center shadow-sm transition-all">
                  <Share2 className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            {property.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {property.images.slice(1).map((img: string, i: number) => (
                  <div key={i} className="rounded-xl overflow-hidden h-24 relative bg-slate-200">
                    <Image src={img} alt="" fill className="object-cover" unoptimized />
                  </div>
                ))}
              </div>
            )}

            {/* Title & Price */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-slate-500">{property.address}, {property.suburb}, {property.city}</span>
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900 mb-3">{property.title}</h1>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-slate-900">{formatPrice(property.price)}</span>
                    {isRent && <span className="text-slate-500 text-sm">/month</span>}
                  </div>
                </div>
              </div>

              {property.property_type !== "commercial" && (
                <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-4 gap-4">
                  {property.bedrooms > 0 && (
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mx-auto mb-1">
                        <Bed className="w-5 h-5 text-slate-600" />
                      </div>
                      <p className="text-base font-bold text-slate-900">{property.bedrooms}</p>
                      <p className="text-xs text-slate-500">Bedrooms</p>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mx-auto mb-1">
                      <Bath className="w-5 h-5 text-slate-600" />
                    </div>
                    <p className="text-base font-bold text-slate-900">{property.bathrooms}</p>
                    <p className="text-xs text-slate-500">Bathrooms</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mx-auto mb-1">
                      <Car className="w-5 h-5 text-slate-600" />
                    </div>
                    <p className="text-base font-bold text-slate-900">{property.parking}</p>
                    <p className="text-xs text-slate-500">Parking</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mx-auto mb-1">
                      <Maximize className="w-5 h-5 text-slate-600" />
                    </div>
                    <p className="text-base font-bold text-slate-900">{property.area}</p>
                    <p className="text-xs text-slate-500">Floor m²</p>
                  </div>
                </div>
              )}

              {property.land_size && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <p className="text-sm text-slate-500">
                    Land size: <span className="text-slate-900 font-medium">{formatArea(property.land_size)}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">About This Property</h2>
              <p className="text-slate-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-slate-100">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.features.map((f: string) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Details */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                {[
                  ["Property Type", property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)],
                  ["Listing Type", isRent ? "Rental" : "For Sale"],
                  ["Province", property.province],
                  ["City", property.city],
                  ["Suburb", property.suburb],
                  ["Floor Area", formatArea(property.area)],
                  ...(property.land_size ? [["Land Size", formatArea(property.land_size)]] : []),
                  ["Listed", new Date(property.created_at).toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })],
                ].map(([key, val]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-slate-400 text-xs">{key}</span>
                    <span className="text-slate-800 font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <PropertyMap
              address={property.address}
              suburb={property.suburb}
              city={property.city}
              province={property.province}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {agent && (
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm sticky top-24">
                <div className="flex items-center gap-3 mb-5">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100">
                    <Image src={agent.photo} alt={agent.name} fill className="object-cover" unoptimized />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{agent.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      <p className="text-xs text-slate-500">{agent.agency}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-slate-600 font-medium">{agent.rating} · {agent.listings} listings</span>
                    </div>
                  </div>
                </div>

                <EnquiryForm propertyId={property.id} propertyTitle={property.title} />

                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <a href={`tel:${agent.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-1.5 text-sm font-medium bg-slate-50 hover:bg-slate-100 text-slate-700 py-2.5 rounded-xl transition-all">
                    <Phone className="w-4 h-4" /> Call
                  </a>
                  <a href={`mailto:${agent.email}`} className="flex items-center justify-center gap-1.5 text-sm font-medium bg-slate-50 hover:bg-slate-100 text-slate-700 py-2.5 rounded-xl transition-all">
                    <Mail className="w-4 h-4" /> Email
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-slate-900 mb-6">More Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all">
                  <div className="h-40 relative bg-slate-100">
                    <Image src={p.images[0]} alt={p.title} fill className="object-cover" unoptimized />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-slate-900 text-sm truncate">{p.title}</p>
                    <p className="text-amber-600 font-bold mt-1">{formatPrice(p.price)}{p.listing_type === "rent" ? "/mo" : ""}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
