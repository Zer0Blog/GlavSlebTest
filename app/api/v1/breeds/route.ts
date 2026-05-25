import { listBreeds } from '@/lib/services/breeds'
import { jsonOk, jsonServerError } from '@/lib/api/response'

export async function GET() {
  try {
    const breeds = await listBreeds()
    return jsonOk(breeds)
  } catch (e) {
    console.error('[GET /api/v1/breeds]', e)
    return jsonServerError()
  }
}
