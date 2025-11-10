import moment from 'moment'

// Set a cookie
export const setCookie = (name: string, value: string, days = 7, path = '/', sameSite: 'Lax' | 'Strict' | 'None' = 'Lax', secure = typeof window !== 'undefined' && window.location.protocol === 'https:') => {
  const expires = moment().add(days, 'days').toDate().toUTCString()

  let cookieStr = `${name}=${value}; expires=${expires}; path=${path}; SameSite=${sameSite}`
  if (secure) cookieStr += '; Secure'

  document.cookie = cookieStr
}

// Get a cookie
export const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(?:^| )${name}=([^;]+)`))
  return match ? match[1] : null
}

// Remove a cookie
export const removeCookie = (name: string, path = '/') => {
  // Using moment to set expiry in the past
  const expires = moment().subtract(1, 'day').toDate().toUTCString()
  document.cookie = `${name}=; expires=${expires}; path=${path}`
}
