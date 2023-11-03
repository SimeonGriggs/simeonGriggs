import {createCookieSessionStorage} from '@remix-run/node'

import {PREVIEW_SESSION_NAME} from './constants'

function prepareSession() {
  if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is required to use sessions.')
  }

  return createCookieSessionStorage({
    cookie: {
      name: PREVIEW_SESSION_NAME,
      sameSite: 'lax',
      secrets: [process.env.SESSION_SECRET],
    },
  })
}

const {getSession, commitSession, destroySession} = prepareSession()

export {commitSession, destroySession, getSession}
