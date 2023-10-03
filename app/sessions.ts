import {createCookieSessionStorage} from '@vercel/remix'

const {getSession, commitSession, destroySession} = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    maxAge: 60,
    path: '/',
    sameSite: 'lax',
    secrets: [String(process.env.SANITY_PREVIEW_SECRET)],
    secure: true,
  },
})

export {commitSession, destroySession, getSession}
