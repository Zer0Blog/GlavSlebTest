import { getSlabBySku } from '@/lib/services/slabs'
import { jsonNotFound, jsonOk, jsonServerError } from '@/lib/api/response'

type Params = { params: Promise<{ sku: string }> }

export async function GET(_request: Request, { params }: Params) {
  try {
    const { sku } = await params
    const slab = await getSlabBySku(sku)
    if (!slab) return jsonNotFound('Слэб не найден')
    return jsonOk(slab)
  } catch (e) {
    console.error('[GET /api/v1/slabs/[sku]]', e)
    return jsonServerError()
  }
}
