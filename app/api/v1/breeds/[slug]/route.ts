import { getBreedBySlug } from '@/lib/services/breeds'
import { jsonNotFound, jsonOk, jsonServerError } from '@/lib/api/response'

type Params = { params: Promise<{ slug: string }> }

export async function GET(_request: Request, { params }: Params) {
  try {
    const { slug } = await params
    const breed = await getBreedBySlug(slug)
    if (!breed) return jsonNotFound('Порода не найдена')
    return jsonOk(breed)
  } catch (e) {
    console.error('[GET /api/v1/breeds/[slug]]', e)
    return jsonServerError()
  }
}
