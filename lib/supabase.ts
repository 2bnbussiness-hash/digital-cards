import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type CardData = {
  id?: string
  subdomain: string
  business_name: string
  owner_name: string
  profession: string
  phone: string
  email: string
  website?: string
  address?: string
  whatsapp?: string
  instagram?: string
  facebook?: string
  linkedin?: string
  template_id: string
  primary_color: string
  secondary_color: string
  is_active?: boolean
  views?: number
  created_at?: string
}