import { createLeadSchema } from '@/lib/validators/leads'
import { createLead } from '@/lib/services/leads'
import { jsonCreated, jsonServerError, jsonValidation } from '@/lib/api/response'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = createLeadSchema.safeParse(body)
    if (!parsed.success) {
      return jsonValidation(parsed.error.flatten())
    }

    const lead = await createLead(parsed.data)
    return jsonCreated(lead)
  } catch (e) {
    console.error('[POST /api/v1/leads]', e)
    return jsonServerError()
  }
}
