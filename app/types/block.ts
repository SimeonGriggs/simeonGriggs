import type {TypedObject} from 'sanity'
import {z} from 'zod'

import {schemaForType} from './schemaForType'

// All blocks will validate against this initially
export const baseTypedObjectZ = z
  .object({
    _type: z.string(),
    _key: z.string(),
  })
  // Not happy we have to pass through, but this is the only way to
  // satisfy TypedObject for `value` in @react/portable-text and the rest of the data through
  .passthrough()

// This helper function will generate a zod parser for a given type
export const typedObjectZ = schemaForType<TypedObject>()(baseTypedObjectZ)

export const typedObjectBlockZ = baseTypedObjectZ.extend({
  style: z.string().optional(),
  children: z
    .array(
      z.object({
        _type: z.string(),
        _key: z.string(),
        marks: z.array(z.string()).optional(),
        text: z.string(),
      })
    )
    .optional(),
  markDefs: z
    .array(
      z
        .object({
          _type: z.string(),
          _key: z.string(),
        })
        .optional()
    )
    .optional(),
})

export type TypedObjectBlock = z.infer<typeof typedObjectBlockZ>
