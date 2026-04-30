import {type RouteConfig} from '@react-router/dev/routes'
import {flatRoutes} from '@react-router/fs-routes'

export default flatRoutes({
  // Sanity Studio is intentionally deployed separately from the Cloudflare Worker
  // (it pulls in very large dependencies like `sanity`).
  // `flatRoutes` matches ignored globs against full file paths, so we include `**/`.
  ignoredRouteFiles: ['**/studio.*'],
}) satisfies RouteConfig
