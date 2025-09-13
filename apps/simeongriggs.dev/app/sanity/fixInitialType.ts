import type {UseQueryOptionsUndefinedInitial} from '@sanity/react-loader'

export function fixInitialType(initial: any): UseQueryOptionsUndefinedInitial {
  return {initial}
}
