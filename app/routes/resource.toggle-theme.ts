import type {ActionFunction, LoaderFunction} from '@vercel/remix'
import {json, redirect} from '@vercel/remix'

import {themePreferenceCookie} from '~/cookies'

export const action: ActionFunction = async ({request}) => {
  const cookieHeader = request.headers.get('Cookie')
  const cookie = (await themePreferenceCookie.parse(cookieHeader)) || {}
  const themePreference = cookie.themePreference === `dark` ? `light` : `dark`

  return json(
    {themePreference},
    {
      headers: {
        'Set-Cookie': await themePreferenceCookie.serialize({
          themePreference,
        }),
      },
    }
  )
}

export const loader: LoaderFunction = () => redirect('/', {status: 404})
