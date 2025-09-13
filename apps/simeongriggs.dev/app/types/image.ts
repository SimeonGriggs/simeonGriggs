import {z} from 'zod'

// SanityImageCrop
export const sanityImageCropZ = z.object({
  _type: z.literal('sanity.imageCrop'),
  left: z.number(),
  bottom: z.number(),
  right: z.number(),
  top: z.number(),
})

// SanityImageHotspot
export const sanityImageHotspotZ = z.object({
  _type: z.literal('sanity.imageHotspot'),
  width: z.number(),
  height: z.number(),
  x: z.number(),
  y: z.number(),
})

export const sanityImageZ = z.object({
  _id: z.string(),
  _type: z.string(),
  altText: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  metadata: z
    .object({
      blurHash: z.string().nullable(),
    })
    .nullable(),
})

// Reused a lot through queries
export const sanityImageObjectExtendedZ = z.object({
  asset: sanityImageZ,
  // GROQ may return null for these
  // But our type requires them to be undefined if they don't exist
  crop: sanityImageCropZ
    .nullable()
    .optional()
    .transform((v) => v ?? undefined),
  hotspot: sanityImageHotspotZ
    .nullable()
    .optional()
    .transform((v) => v ?? undefined),
})
