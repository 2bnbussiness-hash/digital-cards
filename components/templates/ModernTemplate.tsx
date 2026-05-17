import { CardData } from '@/lib/supabase'

export default function ModernTemplate({ card }: { card: CardData }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: `linear-gradient(135deg, ${card.primary_color}15, ${card.secondary_color}15)` }}>
      <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl bg-white">
        <div className="h-32 relative" style={{ background: `linear-gradient(135deg, ${card.primary_color}, ${card.secondary_color})` }}>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
            <span className="text-3xl font-bold" style={{ color: card.primary_color }}>
              {card.business_name.charAt(0)}
            </span>
          </div>
        </div>
        <div className="pt-14 pb-6 px-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">{card.business_name}</h1>
          <p className="text-gray-500 mt-1">{card.owner_name}</p>
          <p className="text-sm font-medium mt-1" style={{ color: card.primary_color }}>{card.profession}</p>
        </div>
        <div className="px-6 pb-6 space-y-3">
          {card.phone && (
            <a href={`tel:${card.phone}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
                style={{ background: card.primary_color }}>📞</span>
              <span className="text-gray-700">{card.phone}</span>
            </a>
          )}
          {card.email && (
            <a href={`mailto:${card.email}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
                style={{ background: card.primary_color }}>✉️</span>
              <span className="text-gray-700">{card.email}</span>
            </a>
          )}
          {card.whatsapp && (
            <a href={`https://wa.me/${card.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
                style={{ background: card.primary_color }}>💬</span>
              <span className="text-gray-700">WhatsApp</span>
            </a>
          )}
          {card.website && (
            <a href={card.website} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
                style={{ background: card.primary_color }}>🌐</span>
              <span className="text-gray-700">{card.website}</span>
            </a>
          )}
          {card.address && (
            <div className="flex items-center gap-3 p-3 rounded-xl">
              <span className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
                style={{ background: card.primary_color }}>📍</span>
              <span className="text-gray-700">{card.address}</span>
            </div>
          )}
        </div>
        {(card.instagram || card.facebook || card.linkedin) && (
          <div className="px-6 pb-6 flex justify-center gap-4">
            {card.instagram && (
              <a href={`https://instagram.com/${card.instagram}`} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ background: card.primary_color }}>📸</a>
            )}
            {card.facebook && (
              <a href={`https://facebook.com/${card.facebook}`} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ background: card.primary_color }}>👤</a>
            )}
            {card.linkedin && (
              <a href={`https://linkedin.com/in/${card.linkedin}`} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ background: card.primary_color }}>💼</a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}