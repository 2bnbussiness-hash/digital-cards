import { supabase } from '@/lib/supabase'
import ModernTemplate from '@/components/templates/ModernTemplate'
import ClassicTemplate from '@/components/templates/ClassicTemplate'
import MinimalTemplate from '@/components/templates/MinimalTemplate'
import BoldTemplate from '@/components/templates/BoldTemplate'
import { notFound } from 'next/navigation'

const templates: any = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  bold: BoldTemplate,
}

export default async function CardPage({ params }: { params: { subdomain: string } }) {
  const { data: card } = await supabase
    .from('cards')
    .select('*')
    .eq('subdomain', params.subdomain)
    .eq('is_active', true)
    .single()

  if (!card) notFound()

  await supabase
    .from('cards')
    .update({ views: (card.views || 0) + 1 })
    .eq('id', card.id)

  const Template = templates[card.template_id] || ModernTemplate

  return <Template card={card} />
}
