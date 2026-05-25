import { z } from 'zod'

export const createLeadSchema = z.object({
  name: z.string().trim().min(1, 'Укажите имя').max(120),
  contact: z.string().trim().min(3, 'Укажите телефон или Telegram').max(120),
  message: z.string().trim().max(2000).optional(),
  source: z.enum(['MODAL', 'CONTACTS', 'PRODUCT', 'OTHER']).default('OTHER'),
  slabSku: z.string().trim().max(32).optional(),
})

export type CreateLeadInput = z.infer<typeof createLeadSchema>
