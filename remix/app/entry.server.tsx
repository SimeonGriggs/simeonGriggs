import ReactDOMServer from 'react-dom/server'
import type {EntryContext} from 'remix'
import {RemixServer} from 'remix'
import dotenv from 'dotenv'

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  dotenv.config()

  const markup = ReactDOMServer.renderToString(
    <RemixServer context={remixContext} url={request.url} />
  )

  responseHeaders.set('Content-Type', 'text/html')

  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
