'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
const defaultForm = {
  business_name: '',
  owner_name: '',
  profession: '',
  phone: '',
  email: '',
  website: '',
  address: '',
  whatsapp: '',
  instagram: '',
  facebook: '',
  linkedin: '',
  primary_color: '#6366f1',
  secondary_color: '#6366f1',
  background_type: 'color' as 'color' | 'image',
  background_image: '',
}
type FormErrors = Partial<Record<keyof typeof defaultForm, string>>
function validateStep1(form: typeof defaultForm): FormErrors {
  const errors: FormErrors = {}
  if (!form.business_name.trim()) errors.business_name = 'שדה חובה'
  else if (form.business_name.trim().length < 2) errors.business_name = 'שם קצר מדי'
  if (!form.owner_name.trim()) errors.owner_name = 'שדה חובה'
  else if (form.owner_name.trim().length < 2) errors.owner_name = 'שם קצר מדי'
  if (!form.profession.trim()) errors.profession = 'שדה חובה'
  if (!form.phone.trim()) errors.phone = 'שדה חובה'
  else if (!/^[\d\s\-\+\(\)]{7,15}$/.test(form.phone.trim())) errors.phone = 'מספר טלפון לא תקין'
  if (!form.email.trim()) errors.email = 'שדה חובה'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'כתובת אימייל לא תקינה'
  if (form.website.trim() && !/^https?:\/\/.+\..+/.test(form.website.trim()))
    errors.website = 'כתובת אתר לא תקינה (חייבת להתחיל ב-https://)'
  return errors
}
function validateStep2(form: typeof defaultForm): FormErrors {
  const errors: FormErrors = {}
  if (form.whatsapp.trim() && !/^\d{7,15}$/.test(form.whatsapp.trim()))
    errors.whatsapp = 'מספר WhatsApp חייב להכיל ספרות בלבד'
  if (form.instagram.trim() && !/^[a-zA-Z0-9._]{1,30}$/.test(form.instagram.trim()))
    errors.instagram = 'שם משתמש לא תקין'
  if (form.facebook.trim() && !/^[a-zA-Z0-9._\-]{1,50}$/.test(form.facebook.trim()))
    errors.facebook = 'שם משתמש לא תקין'
  if (form.linkedin.trim() && !/^[a-zA-Z0-9\-]{1,50}$/.test(form.linkedin.trim()))
    errors.linkedin = 'שם משתמש LinkedIn לא תקין'
  return errors
}
export default function Home() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof typeof defaultForm, boolean>>>({})
  const bgImageRef = useRef<HTMLInputElement>(null)
  const update = (field: keyof typeof defaultForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (touched[field]) {
      const newErrors = step === 1 ? validateStep1({ ...form, [field]: value }) : validateStep2({ ...form, [field]: value })
      setErrors(prev => ({ ...prev, [field]: newErrors[field] }))
    }
  }
  const handleBlur = (field: keyof typeof defaultForm) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const newErrors = step === 1 ? validateStep1(form) : validateStep2(form)
    setErrors(prev => ({ ...prev, [field]: newErrors[field] }))
  }
  const handleBgImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { alert('התמונה גדולה מדי — מקסימום 5MB'); return }
    const reader = new FileReader()
    reader.onload = () => setForm(prev => ({ ...prev, background_image: reader.result as string }))
    reader.readAsDataURL(file)
  }
  const handleNext = () => {
    const newErrors = step === 1 ? validateStep1(form) : step === 2 ? validateStep2(form) : {}
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      const allTouched = Object.keys(newErrors).reduce((acc, k) => ({ ...acc, [k]: true }), {})
      setTouched(prev => ({ ...prev, ...allTouched }))
      return
    }
    if (step < 3) { setStep(step + 1); setErrors({}) }
    else {
      localStorage.setItem('cardForm', JSON.stringify(form))
      router.push('/preview')
    }
  }
  const Field = ({ label, field, placeholder, type = 'text', hint }: {
    label: string; field: keyof typeof defaultForm; placeholder: string; type?: string; hint?: string
  }) => (
    <div className="text-right">
      <label className="text-sm font-medium text-white/80 block mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[field]}
        onChange={e => update(field, e.target.value)}
        onBlur={() => handleBlur(field)}
        className={`w-full border rounded-xl px-4 py-3 text-right text-white placeholder-white/50 focus:outline-none focus:ring-2 bg-white/10 transition-colors ${
          errors[field] ? 'border-red-400 focus:ring-red-200' : 'border-white/20 focus:ring-indigo-300'
        }`}
      />
      {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]}</p>}
      {hint && !errors[field] && <p className="text-white/40 text-xs mt-1">{hint}</p>}
    </div>
  )
  const bgStyle = form.background_type === 'image' && form.background_image
    ? { backgroundImage: `url(${form.background_image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: form.primary_color }
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white tracking-tight">✦ CardPro</h1>
          <p className="text-indigo-300 text-sm mt-1">צור כרטיס ביקור דיגיטלי תוך דקות</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
          {/* Progress - RTL: step 1 on right, step 3 on left */}
          <div className="mb-8">
            <div className="flex flex-row-reverse items-center justify-between mb-3">
              {[
                { n: 1, label: 'פרטים' },
                { n: 2, label: 'רשתות' },
                { n: 3, label: 'עיצוב' },
              ].map(({ n, label }) => (
                <div key={n} className="flex flex-col items-center gap-1">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    n < step ? 'bg-green-400 text-white' :
                    n === step ? 'bg-white text-indigo-700 shadow-lg' :
                    'bg-white/20 text-white/50'
                  }`}>
                    {n < step ? '✓' : n}
                  </div>
                  <span className={`text-xs ${n === step ? 'text-white font-medium' : 'text-white/40'}`}>{label}</span>
                </div>
              ))}
              <div className="absolute left-1/2 -translate-x-1/2 w-48 h-0.5 bg-white/10 -z-10" />
            </div>
          </div>
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white text-right mb-4">פרטי העסק</h2>
              <Field label="שם העסק *" field="business_name" placeholder="למשל: סלון יופי שרה" />
              <Field label="שם הבעלים *" field="owner_name" placeholder="שם מלא" />
              <Field label="מקצוע / תפקיד *" field="profession" placeholder="למשל: מעצבת שיער" />
              <Field label="טלפון *" field="phone" placeholder="050-0000000" type="tel" hint="ספרות, מקפים וסוגריים בלבד" />
              <Field label="אימייל *" field="email" placeholder="you@example.com" type="email" />
              <Field label="אתר אינטרנט" field="website" placeholder="https://example.com" hint="חייב להתחיל ב-https://" />
              <Field label="כתובת" field="address" placeholder="רחוב, עיר" />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white text-right mb-4">רשתות חברתיות</h2>
              <Field label="WhatsApp" field="whatsapp" placeholder="972501234567" type="tel" hint="קוד מדינה + מספר, ספרות בלבד" />
              <Field label="Instagram" field="instagram" placeholder="username" hint="אותיות, מספרים, נקודה וקו תחתון בלבד" />
              <Field label="Facebook" field="facebook" placeholder="username או page name" />
              <Field label="LinkedIn" field="linkedin" placeholder="username" hint="אותיות, מספרים ומקף בלבד" />
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white text-right mb-4">עיצוב הרקע</h2>
              {/* Toggle */}
              <div className="flex rounded-2xl overflow-hidden border border-white/20">
                <button
                  onClick={() => setForm(prev => ({ ...prev, background_type: 'color' }))}
                  className={`flex-1 py-3 text-sm font-semibold transition-all ${
                    form.background_type === 'color' ? 'bg-white text-indigo-700' : 'text-white/60 hover:text-white'
                  }`}>
                  🎨 צבע אחיד
                </button>
                <button
                  onClick={() => setForm(prev => ({ ...prev, background_type: 'image' }))}
                  className={`flex-1 py-3 text-sm font-semibold transition-all ${
                    form.background_type === 'image' ? 'bg-white text-indigo-700' : 'text-white/60 hover:text-white'
                  }`}>
                  🖼️ תמונת רקע
                </button>
              </div>
              {form.background_type === 'color' && (
                <div className="text-right">
                  <label className="text-sm font-medium text-white/80 block mb-3">בחר צבע רקע</label>
                  <div className="flex items-center gap-4 justify-end">
                    <input
                      type="color"
                      value={form.primary_color}
                      onChange={e => update('primary_color', e.target.value)}
                      className="w-14 h-14 rounded-2xl cursor-pointer border-0 shadow-lg"
                    />
                    <span className="text-white/70 font-mono">{form.primary_color}</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-white/50 text-xs mb-2 text-right">צבעים מוכנים</p>
                    <div className="flex gap-2 justify-end flex-wrap">
                      {['#6366f1','#ec4899','#f59e0b','#10b981','#3b82f6','#8b5cf6','#ef4444','#1f2937'].map(c => (
                        <button key={c} onClick={() => update('primary_color', c)}
                          className={`w-8 h-8 rounded-xl shadow transition-transform hover:scale-110 ${form.primary_color === c ? 'ring-2 ring-white scale-110' : ''}`}
                          style={{ background: c }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {form.background_type === 'image' && (
                <div>
                  <input ref={bgImageRef} type="file" accept="image/*" onChange={handleBgImage} className="hidden" />
                  <button onClick={() => bgImageRef.current?.click()}
                    className="w-full border-2 border-dashed border-white/30 rounded-2xl p-6 text-center text-white/60 hover:border-white/60 hover:text-white transition-all">
                    {form.background_image ? (
                      <div>
                        <div className="w-full h-32 rounded-xl overflow-hidden mb-2">
                          <img src={form.background_image} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-sm">לחץ להחלפת תמונה</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-3xl mb-2">🖼️</p>
                        <p className="font-medium">לחץ להעלאת תמונה</p>
                        <p className="text-xs mt-1">PNG, JPG עד 5MB</p>
                      </div>
                    )}
                  </button>
                </div>
              )}
              {/* Preview */}
              <div className="rounded-2xl overflow-hidden shadow-xl h-24 flex items-center justify-center" style={bgStyle}>
                <div className="text-center">
                  <p className="font-black text-white text-lg drop-shadow-lg">{form.business_name || 'שם העסק'}</p>
                  <p className="text-white/80 text-sm drop-shadow">{form.profession || 'מקצוע'}</p>
                </div>
              </div>
            </div>
          )}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button onClick={() => { setStep(step - 1); setErrors({}) }}
                className="flex-1 py-3 rounded-xl border border-white/30 text-white font-medium hover:bg-white/10 transition-colors">
                → חזור
              </button>
            )}
            <button onClick={handleNext}
              className="flex-1 py-3 rounded-xl bg-white text-indigo-700 font-bold text-lg transition-all hover:bg-indigo-50 active:scale-95 shadow-lg">
              {step === 3 ? 'לבחירת עיצוב ✦' : '← הבא'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
