import type {ActionFunction} from 'react-router'

import {themePreferenceCookie} from '~/cookies'

export const action: ActionFunction = async ({request}) => {
  const cookieHeader = request.headers.get('Cookie')
  const cookie = (await themePreferenceCookie.parse(cookieHeader)) || {}
  const themePreference = cookie.themePreference === `dark` ? `light` : `dark`

  return new Response(JSON.stringify({themePreference}), {
    headers: {
      'Set-Cookie': await themePreferenceCookie.serialize({
        themePreference,
      }),
    },
  })
}
