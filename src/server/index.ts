import {type ReactRouterHono} from '@lazuee/react-router-hono'
import {compress} from 'hono/compress'

import {prettyJSON} from 'hono/pretty-json'

import * as env from '../lib/env'
import {clientIp} from './middleware/clientIp'
import routes from './routes'

declare module 'react-router' {
  export interface AppLoadContext {
    readonly env: typeof env
  }
}

declare module 'react-router' {
  interface LoaderFunctionArgs {
    context: AppLoadContext
  }
}

const reactRouterHono: ReactRouterHono = {
  getLoadContext(ctx) {
    return {
      clientIp: ctx.var.clientIp,
      env,
    }
  },
  server(app) {
    app.use(compress({encoding: 'gzip'}), prettyJSON({space: 4}), clientIp())

    app.route('/', routes)
  },
}

export default reactRouterHono
