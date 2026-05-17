import { CardData } from '@/lib/supabase'

export default function MinimalTemplate({ card }: { card: CardData }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <div className="w-full max-w-sm">
        <div className="mb-12">
          <div className="w-2 h-16 mb-6" style={{ background: card.primary_color }}></div>
          <h1 className="text-4xl font-light text-gray-900">{card.business_name}</h1>
          <p className="text-gray-400 mt-2">{card.owner_name}</p>
          <p className="text-sm mt-1" style={{ color: card.primary_color }}>{card.profession}</p>
        </div>
        <div className="space-y-6">
          {card.phone && (
            <a href={`tel:${card.phone}`} className="block group">
              <p className="text-xs text-gray-300 uppercase tracking-widest mb-1">טלפון</p>
              <p className="text-gray-700 group-hover:text-gray-900 transition-colors">{card.phone}</p>
            </a>
          )}
          {card.email && (
            <a href={`mailto:${card.email}`} className="block group">
              <p className="text-xs text-gray-300 uppercase tracking-widest mb-1">אימייל</p>
              <p className="text-gray-700 group-hover:text-gray-900 transition-colors">{card.email}</p>
            </a>
          )}
          {card.whatsapp && (
            <a href={`https://wa.me/${card.whatsapp}`} target="_blank" rel="noopener noreferrer" className="block group">
              <p className="text-xs text-gray-300 uppercase tracking-widest mb-1">WhatsApp</p>
              <p className="text-gray-700 group-hover:text-gray-900 transition-colors">{card.whatsapp}</p>
            </a>
          )}
          {card.website && (
            <a href={card.website} target="_blank" rel="noopener noreferrer" className="block group">
              <p className="text-xs text-gray-300 uppercase tracking-widest mb-1">אתר</p>
              <p className="text-gray-700 group-hover:text-gray-900 transition-colors">{card.website}</p>
            </a>
          )}
          {card.address && (
            <div className="block">
              <p className="text-xs text-gray-300 uppercase tracking-widest mb-1">כתובת</p>
              <p className="text-gray-700">{card.address}</p>
            </div>
          )}
        </div>
        {(card.instagram || card.facebook || card.linkedin) && (
          <div className="mt-12 flex gap-6">
            {card.instagram && (
              <a href={`https://instagram.com/${card.instagram}`} target="_blank" rel="noopener noreferrer"
                className="text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">
                Instagram
              </a>
            )}
            {card.facebook && (
              <a href={`https://facebook.com/${card.facebook}`} target="_blank" rel="noopener noreferrer"
                className="text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">
                Facebook
              </a>
            )}
            {card.linkedin && (
              <a href={`https://linkedin.com/in/${card.linkedin}`} target="_blank" rel="noopener noreferrer"
                className="text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">
                LinkedIn
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
