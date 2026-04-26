'use server'

import { supabase } from '@/lib/supabase'

export async function submitEnquiry(
  propertyId: string,
  _prev: { message: string; ok: boolean },
  formData: FormData
) {
  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const phone = (formData.get('phone') as string)?.trim()
  const message = (formData.get('message') as string)?.trim()

  if (!name || !email || !message) {
    return { message: 'Please fill in your name, email and message.', ok: false }
  }

  const { error } = await supabase
    .from('enquiries')
    .insert({ property_id: propertyId, name, email, phone, message })

  if (error) return { message: 'Something went wrong. Please try again.', ok: false }

  return { message: 'Enquiry sent! The agent will contact you shortly.', ok: true }
}

export async function submitListing(
  _prev: { message: string; ok: boolean },
  formData: FormData
) {
  const title = (formData.get('title') as string)?.trim()
  const rawPrice = (formData.get('price') as string)?.replace(/[^0-9.]/g, '')
  const address = (formData.get('address') as string)?.trim()

  if (!title || !rawPrice || !address) {
    return { message: 'Title, price and address are required.', ok: false }
  }

  const { error } = await supabase.from('listing_submissions').insert({
    seller_type: formData.get('seller_type') as string,
    title,
    price: parseFloat(rawPrice),
    listing_type: formData.get('listing_type') as string,
    property_type: formData.get('property_type') as string,
    address,
    bedrooms: parseInt(formData.get('bedrooms') as string) || 0,
    bathrooms: parseInt(formData.get('bathrooms') as string) || 0,
    parking: parseInt(formData.get('parking') as string) || 0,
    description: (formData.get('description') as string)?.trim(),
    status: 'pending',
  })

  if (error) return { message: 'Something went wrong. Please try again.', ok: false }

  return { message: "Listing submitted! We'll review it and publish within 24 hours.", ok: true }
}
