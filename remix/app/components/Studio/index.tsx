import {Studio} from 'sanity'

import config from '../../../sanity.config'

export default function StudioWrapper() {
  return <Studio config={config} unstable_noAuthBoundary />
}
