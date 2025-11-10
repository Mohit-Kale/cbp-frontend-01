// import { paths } from '@/navigate/paths'
import { paths } from '@/navigate/paths'
import { removeCookie, setCookie } from './cookies'

export const handleLogout = async () => {
  removeCookie('accessToken')
  window.location.replace(paths.home())
}

export const TOKEN_EXPIRE_DURATION = 1

export const setUser = ({ token, redirection = false }: { token: string; redirection?: boolean }) => {
  setCookie('accessToken', token, TOKEN_EXPIRE_DURATION, '/', 'Lax', false)

  if (redirection) {
    const urlParams = new URLSearchParams(window.location.search)
    const returnTo = urlParams.get('returnTo')
    const redirectUrl = returnTo ?? '/'

    window.location.replace(redirectUrl)
  }
}
