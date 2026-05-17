import { CardData } from '@/lib/supabase'

export default function BoldTemplate({ card }: { card: CardData }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: card.primary_color }}>
      <div className="w-full max-w-sm">
        <div className="mb-10 text-white">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-black mb-6"
            style={{ background: card.secondary_color }}>
            {card.business_name.charAt(0)}
          </div>
          <h1 className="text-4xl font-black leading-tight">{card.business_name}</h1>
          <p className="text-white/70 mt-2 text-lg">{card.owner_name}</p>
          <p className="text-white/90 font-semibold mt-1">{card.profession}</p>
        </div>
        <div className="space-y-3">
          {card.phone && (
            <a href={`tel:${card.phone}`}
              className="flex items-center gap-4 p-4 rounded-2xl text-white font-medium transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              <span className="text-2xl">📞</span>
              <span>{card.phone}</span>
            </a>
          )}
          {card.email && (
            <a href={`mailto:${card.email}`}
              className="flex items-center gap-4 p-4 rounded-2xl text-white font-medium transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              <span className="text-2xl">✉️</span>
              <span>{card.email}</span>
            </a>
          )}
          {card.whatsapp && (
            <a href={`https://wa.me/${card.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl text-white font-medium transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              <span className="text-2xl">💬</span>
              <span>WhatsApp</span>
            </a>
          )}
          {card.website && (
            <a href={card.website} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl text-white font-medium transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              <span className="text-2xl">🌐</span>
              <span>{card.website}</span>
            </a>
          )}
          {card.address && (
            <div className="flex items-center gap-4 p-4 rounded-2xl text-white font-medium"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              <span className="text-2xl">📍</span>
              <span>{card.address}</span>
            </div>
          )}
        </div>
        {(card.instagram || card.facebook || card.linkedin) && (
          <div className="mt-6 flex justify-center gap-4">
            {card.instagram && (
              <a href={`https://instagram.com/${card.instagram}`} target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                style={{ background: 'rgba(255,255,255,0.2)' }}>📸</a>
            )}
            {card.facebook && (
              <a href={`https://facebook.com/${card.facebook}`} target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                style={{ background: 'rgba(255,255,255,0.2)' }}>👤</a>
            )}
            {card.linkedin && (
              <a href={`https://linkedin.com/in/${card.linkedin}`} target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                style={{ background: 'rgba(255,255,255,0.2)' }}>💼</a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
