import {useLocation} from 'react-router'

import {removeTrailingSlash} from '~/lib/helpers'

export default function CanonicalLink({origin}: {origin: string}) {
  const {pathname} = useLocation()
  const canonicalUrl = removeTrailingSlash(`${origin}${pathname}`)

  return <link rel="canonical" href={canonicalUrl} />
}
