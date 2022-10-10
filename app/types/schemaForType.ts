import type {z} from 'zod'

// Helper function to generate zod parsers from existing types
export const schemaForType =
  <T>() =>
  <S extends z.ZodType<T, any, any>>(arg: S) => {
    return arg
  }
