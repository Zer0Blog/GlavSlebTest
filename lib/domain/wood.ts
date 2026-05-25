import type { WoodTexture } from '@/lib/generated/prisma/client'

const TEXTURE_CLASS: Record<WoodTexture, string> = {
  WOOD_1: 'wood-1',
  WOOD_2: 'wood-2',
  WOOD_3: 'wood-3',
}

export function woodTextureToClass(texture: WoodTexture): string {
  return TEXTURE_CLASS[texture]
}

export function formatSlabSize(lengthCm: number, widthCm: number, thicknessCm: number): string {
  return `${lengthCm} × ${widthCm} × ${thicknessCm} см`
}

export function formatPriceRub(priceRub: number): string {
  return `${priceRub.toLocaleString('ru-RU')} ₽`
}

export const STOCK_LABELS: Record<string, string> = {
  IN_STOCK: 'На складе',
  ON_ORDER: 'Под заказ',
  RESERVED: 'Забронирован',
  SOLD: 'Продан',
}

export const WORK_CATEGORY_LABELS: Record<string, string> = {
  TABLES: 'Столы',
  COUNTERTOPS: 'Столешницы',
  BAR: 'Барные',
  OTHER: 'Другое',
}
