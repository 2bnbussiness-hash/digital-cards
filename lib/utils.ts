export function generateSubdomain(businessName: string): string {
  return businessName
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-\u0590-\u05ff]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50)
}

export function getCardUrl(subdomain: string): string {
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000'
  if (rootDomain.includes('localhost')) {
    return `http://${rootDomain}/card/${subdomain}`
  }
  return `https://${subdomain}.${rootDomain}`
}

export function formatPhone(phone: string): string {
  return phone.replace(/\D/g, '')
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhone(phone: string): boolean {
  return /^[\d\s\-\+\(\)]{7,15}$/.test(phone)
}