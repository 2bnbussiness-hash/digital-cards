import { CardData } from '@/lib/supabase'

export default function ClassicTemplate({ card }: { card: CardData }): React.ReactElement {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="p-8 text-center border-b-4" style={{ borderColor: card.primary_color }}>
          <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold shadow-lg"
            style={{ background: card.primary_color }}>
            {card.business_name.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{card.business_name}</h1>
          <p className="text-gray-600 mt-1">{card.owner_name}</p>
          <p className="text-sm font-semibold uppercase tracking-widest mt-2" style={{ color: card.primary_color }}>{card.profession}</p>
        </div>
        <div className="p-6 space-y-4">
          {card.phone && <a href={`tel:${card.phone}`} className="flex items-center gap-4 group"><span className="text-2xl">📞</span><div><p className="text-xs text-gray-400 uppercase tracking-wide">טלפון</p><p className="text-gray-700 font-medium">{card.phone}</p></div></a>}
          {card.email && <a href={`mailto:${card.email}`} className="flex items-center gap-4 group"><span className="text-2xl">✉️</span><div><p className="text-xs text-gray-400 uppercase tracking-wide">אימייל</p><p className="text-gray-700 font-medium">{card.email}</p></div></a>}
          {card.address && <div className="flex items-center gap-4"><span className="text-2xl">📍</span><div><p className="text-xs text-gray-400 uppercase tracking-wide">כתובת</p><p className="text-gray-700 font-medium">{card.address}</p></div></div>}
          {card.website && <a href={card.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group"><span className="text-2xl">🌐</span><div><p className="text-xs text-gray-400 uppercase tracking-wide">אתר</p><p className="text-gray-700 font-medium">{card.website}</p></div></a>}
          {card.whatsapp && <a href={`https://wa.me/${card.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group"><span className="text-2xl">💬</span><div><p className="text-xs text-gray-400 uppercase tracking-wide">WhatsApp</p><p className="text-gray-700 font-medium">{card.whatsapp}</p></div></a>}
        </div>
        {(card.instagram || card.facebook || card.linkedin) && (
          <div className="px-6 pb-6 flex justify-center gap-4 border-t pt-4">
            {card.instagram && <a href={`https://instagram.com/${card.instagram}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: card.primary_color }}>📸</a>}
            {card.facebook && <a href={`https://facebook.com/${card.facebook}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: card.primary_color }}>👤</a>}
            {card.linkedin && <a href={`https://linkedin.com/in/${card.linkedin}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: card.primary_color }}>💼</a>}
          </div>
        )}
      </div>
    </div>
  )
}
