import {createQueryStore} from '@sanity/react-loader'

export const {loadQuery, setServerClient, useLiveMode, useQuery} =
  createQueryStore({client: false, ssr: true})
