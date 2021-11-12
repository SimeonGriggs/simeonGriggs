import {createCookie} from 'remix'

export const cookieNames = {
  THEME_PREFERENCE: `theme-preference`,
}

export const themePreference = createCookie(cookieNames.THEME_PREFERENCE)
