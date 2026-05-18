import {createRequestHandler} from 'react-router'

import type {AppEnv} from '~/env.server'

declare global {
  interface CloudflareEnvironment extends AppEnv {}
}

declare module 'react-router' {
  interface AppLoadContext {
    cloudflare: {
      env: AppEnv
      ctx: ExecutionContext
    }
  }
}

const requestHandler = createRequestHandler(
  () => import('virtual:react-router/server-build'),
  import.meta.env.MODE,
)

export default {
  async fetch(request, env, ctx) {
    return requestHandler(request, {
      cloudflare: {env, ctx},
    })
  },
} satisfies ExportedHandler<CloudflareEnvironment>
