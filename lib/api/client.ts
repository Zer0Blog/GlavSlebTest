/**
 * Клиент для REST API v1 (браузер и сервер).
 * Страницы постепенно переходят с захардкоженных массивов на эти функции.
 */

import type {
  ApiErrorBody,
  ApiSuccess,
  BreedDetail,
  BreedListItem,
  LeadCreated,
  LeadSourceDto,
  SlabDetail,
  SlabListItem,
  WorkCategoryDto,
  WorkItem,
} from '@/lib/types/api'

const API_BASE = '/api/v1'

async function apiFetch<T>(path: string, init?: RequestInit): Promise<ApiSuccess<T>> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  const json = await res.json()

  if (!res.ok) {
    const err = json as ApiErrorBody
    throw new Error(err.error?.message ?? `API error ${res.status}`)
  }

  return json as ApiSuccess<T>
}

export const api = {
  health: () => apiFetch<{ status: string; database: string }>('/health'),

  breeds: {
    list: () => apiFetch<BreedListItem[]>('/breeds').then(r => r.data),
    get: (slug: string) => apiFetch<BreedDetail>(`/breeds/${slug}`).then(r => r.data),
  },

  slabs: {
    list: (params?: Record<string, string | number | boolean | undefined>) => {
      const q = new URLSearchParams()
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          if (v !== undefined) q.set(k, String(v))
        })
      }
      const qs = q.toString()
      return apiFetch<SlabListItem[]>(`/slabs${qs ? `?${qs}` : ''}`).then(r => ({
        items: r.data,
        meta: r.meta!,
      }))
    },
    get: (sku: string) => apiFetch<SlabDetail>(`/slabs/${sku}`).then(r => r.data),
    related: (sku: string, limit = 4) =>
      apiFetch<SlabListItem[]>(`/slabs/${sku}/related?limit=${limit}`).then(r => r.data),
  },

  works: {
    list: (category?: WorkCategoryDto) => {
      const qs = category ? `?category=${category}` : ''
      return apiFetch<WorkItem[]>(`/works${qs}`).then(r => r.data)
    },
  },

  leads: {
    create: (body: {
      name: string
      contact: string
      message?: string
      source?: LeadSourceDto
      slabSku?: string
    }) =>
      apiFetch<LeadCreated>('/leads', {
        method: 'POST',
        body: JSON.stringify(body),
      }).then(r => r.data),
  },
}
