import { NextResponse } from 'next/server'
import type { ApiErrorBody, ApiSuccess, PaginationMeta } from '@/lib/types/api'

export function jsonOk<T>(data: T, meta?: PaginationMeta, init?: ResponseInit) {
  const body: ApiSuccess<T> = meta ? { data, meta } : { data }
  return NextResponse.json(body, { status: 200, ...init })
}

export function jsonCreated<T>(data: T) {
  return NextResponse.json({ data } satisfies ApiSuccess<T>, { status: 201 })
}

export function jsonError(
  code: string,
  message: string,
  status: number,
  details?: unknown,
) {
  const body: ApiErrorBody = {
    error: { code, message, ...(details !== undefined ? { details } : {}) },
  }
  return NextResponse.json(body, { status })
}

export function jsonNotFound(message = 'Не найдено') {
  return jsonError('NOT_FOUND', message, 404)
}

export function jsonValidation(details: unknown) {
  return jsonError('VALIDATION_ERROR', 'Некорректные данные', 400, details)
}

export function jsonServerError(message = 'Внутренняя ошибка сервера') {
  return jsonError('INTERNAL_ERROR', message, 500)
}
