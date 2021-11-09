export function getEnv() {
  return {
    FLY: process.env.FLY,
    NODE_ENV: process.env.NODE_ENV,
    SANITY_PREVIEW_SECRET: `asdf1234`,
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
