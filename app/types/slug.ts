import {z} from 'zod'

// Not making this nullable as all my queries check for slug
export const slugZ = z.object({
  current: z.string(),
})
