import { prisma } from '@/lib/db/prisma'
import { getRelatedSlabs } from '@/lib/services/slabs'
import { jsonNotFound, jsonOk, jsonServerError } from '@/lib/api/response'

type Params = { params: Promise<{ sku: string }> }

export async function GET(request: Request, { params }: Params) {
  try {
    const { sku } = await params
    const limit = Math.min(Number(new URL(request.url).searchParams.get('limit') ?? 4), 12)

    const slab = await prisma.slab.findFirst({
      where: { sku, published: true },
      select: { breedId: true },
    })
    if (!slab) return jsonNotFound('Слэб не найден')

    const items = await getRelatedSlabs(slab.breedId, sku, limit)
    return jsonOk(items)
  } catch (e) {
    console.error('[GET /api/v1/slabs/[sku]/related]', e)
    return jsonServerError()
  }
}
