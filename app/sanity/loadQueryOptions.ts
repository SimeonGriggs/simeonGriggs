import type {loadQuery} from '@sanity/react-loader'

import {STUDIO_BASEPATH} from '~/constants'
import {client} from '~/sanity/client'
import {projectId} from '~/sanity/projectDetails'
import {getSession} from '~/sessions'

// I wish I could do this in middleware
// Or move this to server.ts
// But it's simplest, for now, to do it in *every* loader
export async function loadQueryOptions(
  headers: Headers,
): Promise<{preview: boolean; options: Parameters<typeof loadQuery>[2]}> {
  const previewSession = await getSession(headers.get('Cookie'))
  const preview = previewSession.get('projectId') === projectId

  return {
    preview,
    options: {
      perspective: preview ? 'previewDrafts' : 'published',
      stega: preview ? {enabled: true, studioUrl: STUDIO_BASEPATH} : undefined,
    },
  }
}
