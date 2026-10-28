import assert from 'node:assert/strict'
import {test} from 'node:test'
import {PNG} from 'pngjs'

const origin = process.env.OG_TEST_URL
if (!origin)
  throw new Error(
    'Set OG_TEST_URL to a running local Worker or CF Builds preview URL',
  )

function assertPng(bytes: Uint8Array) {
  assert.deepEqual(
    Array.from(bytes.slice(0, 8)),
    [137, 80, 78, 71, 13, 10, 26, 10],
  )
  const header = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  assert.equal(header.getUint32(16), 1200)
  assert.equal(header.getUint32(20), 630)
}

function assertVisibleTitle(bytes: Uint8Array, left = 0) {
  const png = PNG.sync.read(Buffer.from(bytes))
  let whitePixels = 0
  for (let y = 40; y < 450; y++) {
    for (let x = left + 30; x < png.width - 30; x++) {
      const offset = (y * png.width + x) * 4
      if (
        png.data[offset] > 240 &&
        png.data[offset + 1] > 240 &&
        png.data[offset + 2] > 240 &&
        png.data[offset + 3] > 240
      )
        whitePixels++
    }
  }
  assert.ok(whitePixels > 300, 'OG title must render as visible white glyphs')
}

test('serves and caches a correctly sized PNG from the Workers renderer', async () => {
  const url = new URL('/api/og', origin)
  url.searchParams.set('updatedAt', `smoke-${Date.now()}`)
  const first = await fetch(url)
  assert.equal(first.status, 200)
  assert.equal(first.headers.get('content-type'), 'image/png')
  assert.match(first.headers.get('cache-control') ?? '', /public/)
  const bytes = new Uint8Array(await first.arrayBuffer())
  assertPng(bytes)
  assertVisibleTitle(bytes)
  const repeated = await fetch(url)
  assert.equal(repeated.status, 200)
  assert.deepEqual(new Uint8Array(await repeated.arrayBuffer()), bytes)
})

test('rejects malformed and draft document IDs', async () => {
  for (const id of ['../private', 'drafts.private-document']) {
    const url = new URL('/api/og', origin)
    url.searchParams.set('id', id)
    assert.equal((await fetch(url)).status, 400)
  }
})

test('returns 404 for a missing published document', async () => {
  const url = new URL(
    '/api/og?id=og-regression-document-that-does-not-exist',
    origin,
  )
  assert.equal((await fetch(url)).status, 404)
})

test(
  'renders a published document image',
  {skip: !process.env.OG_TEST_DOCUMENT_ID},
  async () => {
    const url = new URL('/api/og', origin)
    url.searchParams.set('id', process.env.OG_TEST_DOCUMENT_ID!)
    url.searchParams.set('updatedAt', `smoke-${Date.now()}`)
    const response = await fetch(url)
    assert.equal(response.status, 200)
    const bytes = new Uint8Array(await response.arrayBuffer())
    assertPng(bytes)
    assertVisibleTitle(bytes, 400)
  },
)
