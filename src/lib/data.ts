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
  listing_type: ListingType;
  property_type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  area: number;
  land_size?: number;
  description: string;
  features: string[];
  images: string[];
  agent_id: string;
  featured: boolean;
  new_development: boolean;
  created_at: string;
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
