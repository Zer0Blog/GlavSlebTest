import { listWorksQuerySchema } from '@/lib/validators/slabs'
import { listWorks } from '@/lib/services/works'
import { jsonOk, jsonServerError, jsonValidation } from '@/lib/api/response'

export async function GET(request: Request) {
  try {
    const raw = Object.fromEntries(new URL(request.url).searchParams.entries())
    const parsed = listWorksQuerySchema.safeParse(raw)
    if (!parsed.success) {
      return jsonValidation(parsed.error.flatten())
    }

    const works = await listWorks(parsed.data.category)
    return jsonOk(works)
  } catch (e) {
    console.error('[GET /api/v1/works]', e)
    return jsonServerError()
  }
}
