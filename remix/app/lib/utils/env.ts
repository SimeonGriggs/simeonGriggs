// process.env reads from .env because it is configured inside `entry.server.tsx`

export function getEnv() {
  return {
    FLY: process.env.FLY,
    NODE_ENV: process.env.NODE_ENV,
    // SANITY_PREVIEW_SECRET: process.env.SANITY_PREVIEW_SECRET,
  }
}

type ENV = ReturnType<typeof getEnv>

// App puts these on
declare global {
  // eslint-disable-next-line
  var ENV: ENV
  // interface Window {
  //   ENV: ENV
  // }
}
