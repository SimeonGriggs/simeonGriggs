import {validatePreviewUrl} from '@sanity/preview-url-secret'
import {type ActionFunction, type LoaderFunctionArgs, redirect} from 'react-router'

import {client} from '~/sanity/client'
import {commitSession, destroySession, getSession} from '~/sessions'

// A `POST` request to this route will exit preview mode
export const action: ActionFunction = async ({request}) => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {status: 405})
  }

  const session = await getSession(request.headers.get('Cookie'))

  return redirect('/', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  })
}

// A `GET` request to this route will enter preview mode
export const loader = async ({request}: LoaderFunctionArgs) => {
  if (!process.env.SANITY_READ_TOKEN) {
    throw new Response('Preview mode missing token', {status: 401})
  }

  const clientWithToken = client.withConfig({
    token: process.env.SANITY_READ_TOKEN,
  })

  const {isValid, redirectTo = '/'} = await validatePreviewUrl(clientWithToken, request.url)

  if (!isValid) {
    throw new Response('Invalid secret', {status: 401})
  }

  const session = await getSession(request.headers.get('Cookie'))
  await session.set('projectId', client.config().projectId)

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}
