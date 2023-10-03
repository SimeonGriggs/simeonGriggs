import {createCookie} from '@vercel/remix'

export const themePreferenceCookie = createCookie(`themePreference`, {
  path: '/',
})
