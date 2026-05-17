import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { generateSubdomain, getCardUrl } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const subdomain = generateSubdomain(body.business_name)

    if (!subdomain) {
      return NextResponse.json(
        { error: 'שם העסק אינו תקין' },
        { status: 400 }
      )
    }

    // בדיקה אם ה-subdomain כבר קיים
    const { data: existing } = await supabase
      .from('cards')
      .select('subdomain')
      .eq('subdomain', subdomain)
      .single()

    const finalSubdomain = existing
      ? `${subdomain}-${Date.now().toString().slice(-4)}`
      : subdomain

    const { data, error } = await supabase
      .from('cards')
      .insert([{
        ...body,
        subdomain: finalSubdomain,
        is_active: true,
        views: 0,
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      subdomain: finalSubdomain,
      url: getCardUrl(finalSubdomain),
      data,
    })
  } catch (error) {
    console.error('Error creating card:', error)
    return NextResponse.json(
      { error: 'שגיאה ביצירת הכרטיס' },
      { status: 500 }
    )
  }
}