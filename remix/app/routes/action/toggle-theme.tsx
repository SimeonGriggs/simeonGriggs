import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import {json, redirect} from '@remix-run/node'

// Don't follow this example, I don't think it's right (but it works?)
export const action: ActionFunction = async ({request}) => {
  const requestText = await request.text()
  const form = new URLSearchParams(requestText)
  const themePreference = form.get('themePreference')

  return json(
    {success: true},
    {
      headers: {'Set-Cookie': `themePreference=${themePreference}; Path=/; max-age=31536000;`},
    }
  )
}

export const loader: LoaderFunction = () => redirect('/', {status: 404})
