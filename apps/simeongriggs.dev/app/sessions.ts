import {createCookieSessionStorage} from 'react-router'

import type {AppEnv} from '~/env.server'
import {getRequiredEnvValue} from '~/env.server'

export const PREVIEW_SESSION_NAME = '__preview'

function getSessionStorage(env: AppEnv) {
  return createCookieSessionStorage({
    cookie: {
      name: PREVIEW_SESSION_NAME,
      secrets: [getRequiredEnvValue(env, 'SANITY_SESSION_SECRET')],
      sameSite: 'lax',
    },
  })
}

export function getSession(env: AppEnv, cookieHeader?: string | null) {
  return getSessionStorage(env).getSession(cookieHeader)
}

export function commitSession(
  env: AppEnv,
  session: Awaited<ReturnType<typeof getSession>>,
) {
  return getSessionStorage(env).commitSession(session)
}

export function destroySession(
  env: AppEnv,
  session: Awaited<ReturnType<typeof getSession>>,
) {
  return getSessionStorage(env).destroySession(session)
}
