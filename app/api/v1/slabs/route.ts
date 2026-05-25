import { listSlabsQuerySchema } from '@/lib/validators/slabs'
import { listSlabs } from '@/lib/services/slabs'
import { jsonOk, jsonServerError, jsonValidation } from '@/lib/api/response'

export async function GET(request: Request) {
  try {
    const raw = Object.fromEntries(new URL(request.url).searchParams.entries())
    const parsed = listSlabsQuerySchema.safeParse(raw)
    if (!parsed.success) {
      return jsonValidation(parsed.error.flatten())
    }

    const { items, meta } = await listSlabs(parsed.data)
    return jsonOk(items, meta)
  } catch (e) {
    console.error('[GET /api/v1/slabs]', e)
    return jsonServerError()
  }
}
