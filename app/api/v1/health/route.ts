import { prisma } from '@/lib/db/prisma'
import { jsonOk, jsonServerError } from '@/lib/api/response'

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return jsonOk({ status: 'ok', database: 'connected' })
  } catch {
    return jsonServerError('База данных недоступна')
  }
}
