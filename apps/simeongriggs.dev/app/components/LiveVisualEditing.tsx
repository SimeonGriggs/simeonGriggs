import {client} from '~/sanity/client'
import {useLiveMode} from '@sanity/react-loader'
import {VisualEditing} from '@sanity/visual-editing/react-router'

const stegaClient = client.withConfig({
  stega: {enabled: true, studioUrl: `/studio`},
})

// Export default required for lazy loading
// eslint-disable-next-line import/no-default-export
export default function LiveVisualEditing() {
  useLiveMode({client: stegaClient})

  return <VisualEditing />
}
