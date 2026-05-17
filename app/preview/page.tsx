'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import React from 'react'
import ModernTemplate from '@/components/templates/ModernTemplate'
import ClassicTemplate from '@/components/templates/ClassicTemplate'
import MinimalTemplate from '@/components/templates/MinimalTemplate'
import BoldTemplate from '@/components/templates/BoldTemplate'
import { CardData } from '@/lib/supabase'

const templates: { id: string; name: string; Component: (props: { card: CardData }) => React.ReactElement }[] = [
  { id: 'modern', name: 'מודרני', Component: ModernTemplate },
  { id: 'classic', name: 'קלאסי', Component: ClassicTemplate },
  { id: 'minimal', name: 'מינימליסטי', Component: MinimalTemplate },
  { id: 'bold', name: 'נועז', Component: BoldTemplate },
]

export default function PreviewPage() {
  const router = useRouter()
  const [form, setForm] = useState<CardData | null>(null)
  const [selected, setSelected] = useState('modern')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('cardForm')
    if (!saved) { router.push('/'); return }
    setForm(JSON.parse(saved))
  }, [])

  const handleCreate = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/create-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, template_id: selected }),
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem('cardResult', JSON.stringify(data))
        router.push('/success')
      } else {
        alert('שגיאה: ' + data.error)
      }
    } catch {
      alert('שגיאה ביצירת הכרטיס')
    } finally {
      setLoading(false)
    }
  }

  if (!form) return null

  const ActiveTemplate = templates.find(t => t.id === selected)?.Component || ModernTemplate

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <button onClick={() => router.push('/')} className="text-gray-500 hover:text-gray-700">← חזור</button>
        <h1 className="font-bold text-lg text-gray-800">בחר עיצוב</h1>
        <button onClick={handleCreate} disabled={loading}
          className="px-6 py-2 rounded-xl text-white font-bold disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
          {loading ? 'יוצר...' : 'צור כרטיס ←'}
        </button>
      </div>
      <div className="flex gap-2 p-4 overflow-x-auto bg-white border-b">
        {templates.map(t => (
          <button key={t.id} onClick={() => setSelected(t.id)}
            className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${selected === t.id ? 'text-white' : 'bg-gray-100 text-gray-600'}`}
            style={selected === t.id ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' } : {}}>
            {t.name}
          </button>
        ))}
      </div>
      <div className="max-w-sm mx-auto mt-6 rounded-3xl overflow-hidden shadow-2xl">
        <ActiveTemplate card={{ ...form, template_id: selected }} />
      </div>
    </main>
  )
}
