import { prisma } from '@/lib/db/prisma'
import type { CreateLeadInput } from '@/lib/validators/leads'
import type { LeadCreated } from '@/lib/types/api'

export async function createLead(input: CreateLeadInput): Promise<LeadCreated> {
  let slabId: string | undefined

  if (input.slabSku) {
    const slab = await prisma.slab.findUnique({
      where: { sku: input.slabSku },
      select: { id: true },
    })
    slabId = slab?.id
  }

  const lead = await prisma.lead.create({
    data: {
      name: input.name,
      contact: input.contact,
      message: input.message ?? null,
      source: input.source,
      slabId,
    },
  })

  return {
    id: lead.id,
    status: 'NEW',
    createdAt: lead.createdAt.toISOString(),
  }
}
