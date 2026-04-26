import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Car, Maximize, MapPin, Star } from "lucide-react";
import { type Property } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

interface Props {
  property: Property;
}

export default function PropertyCard({ property }: Props) {
  const isRent = property.listing_type === "rent";

  return (
    <Link href={`/property/${property.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isRent ? "bg-blue-600 text-white" : "bg-emerald-600 text-white"}`}>
            {isRent ? "TO RENT" : "FOR SALE"}
          </span>
          {property.new_development && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500 text-white">NEW</span>
          )}
          {property.featured && !property.new_development && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-600 text-white flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" /> FEATURED
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-white font-bold text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {formatPrice(property.price)}
            {isRent && <span className="text-sm font-normal">/mo</span>}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start gap-1 mb-1">
          <MapPin className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-xs text-slate-500 truncate">{property.suburb}, {property.city}</p>
        </div>
        <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
          {property.title}
        </h3>

        {property.property_type !== "commercial" && (
          <div className="flex items-center gap-3 text-xs text-slate-500 pt-3 border-t border-slate-100">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-slate-400" />
                {property.bedrooms}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              {property.bathrooms}
            </span>
            <span className="flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-slate-400" />
              {property.parking}
            </span>
            <span className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5 text-slate-400" />
              {property.area}m²
            </span>
          </div>
        )}
        {property.property_type === "commercial" && (
          <div className="flex items-center gap-3 text-xs text-slate-500 pt-3 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5 text-slate-400" />
              {property.area}m²
            </span>
            <span className="flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-slate-400" />
              {property.parking} parking
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
