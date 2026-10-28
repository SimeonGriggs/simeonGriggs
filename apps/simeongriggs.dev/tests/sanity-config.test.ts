import assert from 'node:assert/strict'
import {test} from 'node:test'

import {getEnv} from '../app/env.server'
import {resolveSanityConfig} from '../app/sanity/resolveSanityConfig'

test('resolves Worker bindings without Vite build-time variables', () => {
  const config = resolveSanityConfig(
    getEnv({
      cloudflare: {
        env: {
          VITE_SANITY_PROJECT_ID: 'runtime-project',
          VITE_SANITY_DATASET: 'preview',
          VITE_SANITY_API_VERSION: '2025-11-01',
        },
      },
    }),
  )

  assert.deepEqual(config, {
    projectId: 'runtime-project',
    dataset: 'preview',
    apiVersion: '2025-11-01',
  })
})

test('keeps configuration isolated between requests and defaults the API version', () => {
  for (const dataset of ['preview', 'production']) {
    assert.deepEqual(
      resolveSanityConfig({
        VITE_SANITY_PROJECT_ID: 'runtime-project',
        VITE_SANITY_DATASET: dataset,
      }),
      {projectId: 'runtime-project', dataset, apiVersion: '2024-02-13'},
    )
  }
})

test('reports missing runtime configuration when no build-time values exist', () => {
  assert.throws(() => resolveSanityConfig({}), /Missing Sanity configuration/)
  assert.throws(
    () => getEnv(undefined),
    /Missing Cloudflare environment bindings/,
  )
})
