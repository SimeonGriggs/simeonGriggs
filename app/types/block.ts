import {z} from 'zod'

// All blocks will validate against this initially
// export const baseTypedObjectZ = z
//   .object({
//     _type: z.string(),
//     _key: z.string().optional(),
// })
// Not happy we have to pass through, but this is the only way to
// satisfy TypedObject for `value` in @react/portable-text and the rest of the data through
// .passthrough()
export const baseTypedObjectZ = z
  .object({
    _type: z.string(),
    _key: z.string().optional(),
  })
  // Not happy we have to pass through, but this is the only way to
  // satisfy TypedObject for `value` in @react/portable-text and the rest of the data through
  .passthrough()

// This helper function will generate a zod parser for a given type
// TypedObject
export const typedObjectZ = z.any()

export const typedObjectBlockZ = baseTypedObjectZ.extend({
  style: z.string().optional(),
})

export type TypedObjectBlock = z.infer<typeof typedObjectBlockZ>
