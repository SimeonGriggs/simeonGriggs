import {createQueryStore} from '@sanity/react-loader'

export const queryStore = createQueryStore({client: false, ssr: true})
