'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SuccessPage() {
  const router = useRouter()
  const [result, setResult] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('cardResult')
    if (!saved) { router.push('/'); return }
    setResult(JSON.parse(saved))
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(result.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!result) return null

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">הכרטיס נוצר בהצלחה!</h1>
        <p className="text-gray-500 mb-8">הכרטיס שלך מוכן לשיתוף</p>
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <p className="text-sm text-gray-400 mb-2">הלינק שלך</p>
          <p className="font-mono text-indigo-600 break-all text-sm">{result.url}</p>
        </div>
        <div className="space-y-3">
          <button onClick={handleCopy}
            className="w-full py-3 rounded-xl text-white font-bold transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            {copied ? '✓ הועתק!' : 'העתק לינק'}
          </button>
          <button onClick={() => window.open(result.url, '_blank')}
            className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50">
            פתח את הכרטיס
          </button>
          <button onClick={() => { localStorage.clear(); router.push('/') }}
            className="w-full py-3 rounded-xl text-gray-400 text-sm hover:text-gray-600">
            צור כרטיס נוסף
          </button>
        </div>
      </div>
    </main>
  )
}
