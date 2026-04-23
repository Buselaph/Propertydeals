export type PropertyType = "house" | "apartment" | "townhouse" | "land" | "commercial";
export type ListingType = "sale" | "rent";

export interface Property {
  id: string;
  title: string;
  address: string;
  suburb: string;
  city: string;
  province: string;
  price: number;
  listingType: ListingType;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  area: number;
  landSize?: number;
  description: string;
  features: string[];
  images: string[];
  agentId: string;
  featured: boolean;
  newDevelopment: boolean;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  photo: string;
  agency: string;
  phone: string;
  email: string;
  listings: number;
  rating: number;
  area: string;
}

export const agents: Agent[] = [
  {
    id: "a1",
    name: "Sipho Dlamini",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    agency: "Richards Bay Realty",
    phone: "035 123 4567",
    email: "sipho@rbcrealty.co.za",
    listings: 24,
    rating: 4.9,
    area: "Richards Bay",
  },
  {
    id: "a2",
    name: "Nomsa Khumalo",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    agency: "Coastal Properties KZN",
    phone: "035 234 5678",
    email: "nomsa@coastalkzn.co.za",
    listings: 18,
    rating: 4.8,
    area: "Empangeni",
  },
  {
    id: "a3",
    name: "Thabo Nkosi",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    agency: "Prime Estates SA",
    phone: "035 345 6789",
    email: "thabo@primeestates.co.za",
    listings: 31,
    rating: 4.7,
    area: "Durban North",
  },
  {
    id: "a4",
    name: "Lindiwe Zulu",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    agency: "KZN Property Group",
    phone: "031 456 7890",
    email: "lindiwe@kznprop.co.za",
    listings: 42,
    rating: 4.9,
    area: "Durban",
  },
];

export const properties: Property[] = [
  {
    id: "p1",
    title: "Stunning Waterfront Home",
    address: "12 Harbour Drive",
    suburb: "Meerensee",
    city: "Richards Bay",
    province: "KwaZulu-Natal",
    price: 3850000,
    listingType: "sale",
    propertyType: "house",
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    area: 320,
    landSize: 850,
    description: "Magnificent waterfront property offering breathtaking lagoon views. This modern home features an open-plan living and dining area that flows seamlessly onto a large entertainment deck overlooking the water. The gourmet kitchen is fitted with top-of-the-range appliances.",
    features: ["Pool", "Double Garage", "Alarm System", "Fibre Internet", "Solar Panels", "Borehole"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop",
    ],
    agentId: "a1",
    featured: true,
    newDevelopment: false,
    createdAt: "2026-04-20",
  },
  {
    id: "p2",
    title: "Modern 3-Bedroom Townhouse",
    address: "45 Allandale Road",
    suburb: "Allandale",
    city: "Richards Bay",
    province: "KwaZulu-Natal",
    price: 1650000,
    listingType: "sale",
    propertyType: "townhouse",
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    area: 180,
    landSize: 300,
    description: "Beautifully designed townhouse in a secure complex. Features open-plan living areas, modern kitchen with granite countertops, and a private enclosed garden. The complex offers 24-hour security, communal pool, and is pet-friendly.",
    features: ["Pool", "24hr Security", "Pet Friendly", "Enclosed Garden", "Fibre Ready"],
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop",
    ],
    agentId: "a1",
    featured: true,
    newDevelopment: false,
    createdAt: "2026-04-18",
  },
  {
    id: "p3",
    title: "Luxury Beachfront Apartment",
    address: "Unit 8, Ocean View Tower",
    suburb: "CBD",
    city: "Durban",
    province: "KwaZulu-Natal",
    price: 25000,
    listingType: "rent",
    propertyType: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    area: 110,
    description: "Stunning ocean-facing apartment in a premium building. Floor-to-ceiling windows offering panoramic sea views. Fully equipped kitchen, air conditioning throughout, and access to rooftop pool and gym.",
    features: ["Sea View", "Pool", "Gym", "24hr Security", "Air Conditioning", "Concierge"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop",
    ],
    agentId: "a4",
    featured: true,
    newDevelopment: false,
    createdAt: "2026-04-22",
  },
  {
    id: "p4",
    title: "Spacious Family Home",
    address: "7 Protea Street",
    suburb: "Brackenham",
    city: "Richards Bay",
    province: "KwaZulu-Natal",
    price: 2200000,
    listingType: "sale",
    propertyType: "house",
    bedrooms: 5,
    bathrooms: 3,
    parking: 3,
    area: 420,
    landSize: 1200,
    description: "Exceptional family home in the sought-after Brackenham area. Set on a large stand with mature trees and lush garden. Features include a large entertainment area, swimming pool, double garage plus carport, and a flatlet.",
    features: ["Pool", "Flatlet", "Triple Garage", "Lapa", "Solar Geyser", "Garden Irrigation"],
    images: [
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=500&fit=crop",
    ],
    agentId: "a2",
    featured: false,
    newDevelopment: false,
    createdAt: "2026-04-15",
  },
  {
    id: "p5",
    title: "New Development — 2BR Apartment",
    address: "Phase 1, Harbour City Estate",
    suburb: "Arboretum",
    city: "Richards Bay",
    province: "KwaZulu-Natal",
    price: 1100000,
    listingType: "sale",
    propertyType: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    area: 95,
    description: "Brand new development in the heart of Richards Bay. These contemporary apartments offer modern finishes, open-plan living, and stunning views. Development includes landscaped gardens, clubhouse, and fibre connectivity.",
    features: ["New Development", "Clubhouse", "Fibre", "Backup Power", "Secure Parking"],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=500&fit=crop",
    ],
    agentId: "a3",
    featured: true,
    newDevelopment: true,
    createdAt: "2026-04-21",
  },
  {
    id: "p6",
    title: "Prime Commercial Office Space",
    address: "Suite 12, Business Park",
    suburb: "CBD",
    city: "Richards Bay",
    province: "KwaZulu-Natal",
    price: 18500,
    listingType: "rent",
    propertyType: "commercial",
    bedrooms: 0,
    bathrooms: 2,
    parking: 6,
    area: 250,
    description: "Premium A-grade office space in Richards Bay's premier business park. Open-plan layout with boardroom, server room, and kitchenette. Fibre internet, generator backup, and ample parking make this ideal for corporate tenants.",
    features: ["Fibre Internet", "Generator", "Boardroom", "Air Conditioning", "Access Control"],
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop",
    ],
    agentId: "a2",
    featured: false,
    newDevelopment: false,
    createdAt: "2026-04-10",
  },
];

export const provinces = [
  "All Provinces",
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "Northern Cape",
  "North West",
  "Western Cape",
];

export const cities = [
  "All Cities",
  "Cape Town",
  "Durban",
  "Empangeni",
  "Johannesburg",
  "Port Elizabeth",
  "Pretoria",
  "Richards Bay",
];
