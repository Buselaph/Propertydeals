-- Run this entire file in Supabase SQL Editor to set up your tables and seed data

create table if not exists agents (
  id text primary key,
  name text not null,
  photo text,
  agency text,
  phone text,
  email text,
  listings integer default 0,
  rating numeric(3,1) default 0,
  area text
);

create table if not exists properties (
  id text primary key,
  title text not null,
  address text,
  suburb text,
  city text,
  province text,
  price numeric not null,
  listing_type text check (listing_type in ('sale','rent')),
  property_type text check (property_type in ('house','apartment','townhouse','land','commercial')),
  bedrooms integer default 0,
  bathrooms integer default 0,
  parking integer default 0,
  area numeric,
  land_size numeric,
  description text,
  features text[] default '{}',
  images text[] default '{}',
  agent_id text references agents(id),
  featured boolean default false,
  new_development boolean default false,
  created_at timestamptz default now()
);

-- Enquiries submitted via property detail page
create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  property_id text references properties(id),
  name text,
  email text,
  phone text,
  message text,
  created_at timestamptz default now()
);

-- Listings submitted via list-property page
create table if not exists listing_submissions (
  id uuid primary key default gen_random_uuid(),
  seller_type text,
  title text,
  price numeric,
  listing_type text,
  property_type text,
  address text,
  bedrooms integer,
  bathrooms integer,
  parking integer,
  description text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- ── Seed data ──────────────────────────────────────────────────────────────

insert into agents (id, name, photo, agency, phone, email, listings, rating, area) values
  ('a1', 'Sipho Dlamini',
   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
   'Richards Bay Realty', '035 123 4567', 'sipho@rbcrealty.co.za', 24, 4.9, 'Richards Bay'),
  ('a2', 'Nomsa Khumalo',
   'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
   'Coastal Properties KZN', '035 234 5678', 'nomsa@coastalkzn.co.za', 18, 4.8, 'Empangeni'),
  ('a3', 'Thabo Nkosi',
   'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
   'Prime Estates SA', '035 345 6789', 'thabo@primeestates.co.za', 31, 4.7, 'Durban North'),
  ('a4', 'Lindiwe Zulu',
   'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
   'KZN Property Group', '031 456 7890', 'lindiwe@kznprop.co.za', 42, 4.9, 'Durban')
on conflict (id) do nothing;

insert into properties
  (id, title, address, suburb, city, province, price, listing_type, property_type,
   bedrooms, bathrooms, parking, area, land_size, description, features, images,
   agent_id, featured, new_development, created_at)
values
  ('p1','Stunning Waterfront Home','12 Harbour Drive','Meerensee','Richards Bay','KwaZulu-Natal',
   3850000,'sale','house',4,3,2,320,850,
   'Magnificent waterfront property offering breathtaking lagoon views. This modern home features an open-plan living and dining area that flows seamlessly onto a large entertainment deck overlooking the water. The gourmet kitchen is fitted with top-of-the-range appliances.',
   ARRAY['Pool','Double Garage','Alarm System','Fibre Internet','Solar Panels','Borehole'],
   ARRAY['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop','https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop'],
   'a1',true,false,'2026-04-20'),

  ('p2','Modern 3-Bedroom Townhouse','45 Allandale Road','Allandale','Richards Bay','KwaZulu-Natal',
   1650000,'sale','townhouse',3,2,2,180,300,
   'Beautifully designed townhouse in a secure complex. Features open-plan living areas, modern kitchen with granite countertops, and a private enclosed garden. The complex offers 24-hour security, communal pool, and is pet-friendly.',
   ARRAY['Pool','24hr Security','Pet Friendly','Enclosed Garden','Fibre Ready'],
   ARRAY['https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=500&fit=crop','https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop'],
   'a1',true,false,'2026-04-18'),

  ('p3','Luxury Beachfront Apartment','Unit 8, Ocean View Tower','CBD','Durban','KwaZulu-Natal',
   25000,'rent','apartment',2,2,1,110,null,
   'Stunning ocean-facing apartment in a premium building. Floor-to-ceiling windows offering panoramic sea views. Fully equipped kitchen, air conditioning throughout, and access to rooftop pool and gym.',
   ARRAY['Sea View','Pool','Gym','24hr Security','Air Conditioning','Concierge'],
   ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop','https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop'],
   'a4',true,false,'2026-04-22'),

  ('p4','Spacious Family Home','7 Protea Street','Brackenham','Richards Bay','KwaZulu-Natal',
   2200000,'sale','house',5,3,3,420,1200,
   'Exceptional family home in the sought-after Brackenham area. Set on a large stand with mature trees and lush garden. Features include a large entertainment area, swimming pool, double garage plus carport, and a flatlet.',
   ARRAY['Pool','Flatlet','Triple Garage','Lapa','Solar Geyser','Garden Irrigation'],
   ARRAY['https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=500&fit=crop','https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=500&fit=crop'],
   'a2',false,false,'2026-04-15'),

  ('p5','New Development — 2BR Apartment','Phase 1, Harbour City Estate','Arboretum','Richards Bay','KwaZulu-Natal',
   1100000,'sale','apartment',2,2,1,95,null,
   'Brand new development in the heart of Richards Bay. These contemporary apartments offer modern finishes, open-plan living, and stunning views. Development includes landscaped gardens, clubhouse, and fibre connectivity.',
   ARRAY['New Development','Clubhouse','Fibre','Backup Power','Secure Parking'],
   ARRAY['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop','https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=500&fit=crop'],
   'a3',true,true,'2026-04-21'),

  ('p6','Prime Commercial Office Space','Suite 12, Business Park','CBD','Richards Bay','KwaZulu-Natal',
   18500,'rent','commercial',0,2,6,250,null,
   'Premium A-grade office space in Richards Bay''s premier business park. Open-plan layout with boardroom, server room, and kitchenette. Fibre internet, generator backup, and ample parking make this ideal for corporate tenants.',
   ARRAY['Fibre Internet','Generator','Boardroom','Air Conditioning','Access Control'],
   ARRAY['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop','https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop'],
   'a2',false,false,'2026-04-10')
on conflict (id) do nothing;

-- Allow public read on properties and agents (Row Level Security)
alter table agents enable row level security;
alter table properties enable row level security;
alter table enquiries enable row level security;
alter table listing_submissions enable row level security;

create policy "public read agents" on agents for select using (true);
create policy "public read properties" on properties for select using (true);
create policy "public insert enquiries" on enquiries for insert with check (true);
create policy "public insert listings" on listing_submissions for insert with check (true);
