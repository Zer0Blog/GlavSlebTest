import { z } from 'zod'

export const listSlabsQuerySchema = z.object({
  breed: z.string().optional(),
  stock: z.enum(['IN_STOCK', 'ON_ORDER', 'RESERVED', 'SOLD']).optional(),
  minLength: z.coerce.number().int().positive().optional(),
  maxLength: z.coerce.number().int().positive().optional(),
  minThickness: z.coerce.number().int().positive().optional(),
  maxThickness: z.coerce.number().int().positive().optional(),
  sort: z
    .enum(['default', 'price_asc', 'price_desc', 'size_desc'])
    .default('default'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(48).default(24),
  featured: z
    .enum(['true', 'false'])
    .optional()
    .transform(v => (v === 'true' ? true : v === 'false' ? false : undefined)),
})

export type ListSlabsQuery = z.infer<typeof listSlabsQuerySchema>

export const listWorksQuerySchema = z.object({
  category: z.enum(['TABLES', 'COUNTERTOPS', 'BAR', 'OTHER']).optional(),
})
