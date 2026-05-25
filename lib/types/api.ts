/** Публичные DTO — то, что отдаёт REST API v1 */

export type WoodTextureDto = 'wood-1' | 'wood-2' | 'wood-3'
export type StockStatusDto = 'IN_STOCK' | 'ON_ORDER' | 'RESERVED' | 'SOLD'
export type WorkCategoryDto = 'TABLES' | 'COUNTERTOPS' | 'BAR' | 'OTHER'
export type LeadSourceDto = 'MODAL' | 'CONTACTS' | 'PRODUCT' | 'OTHER'

export type BreedListItem = {
  id: string
  slug: string
  abbr: string
  name: string
  latinName: string
  tag: string | null
  hardness: string | null
  colorHex: string | null
  woodClass: WoodTextureDto
  slabCount: number
}

export type BreedDetail = BreedListItem & {
  description: string
}

export type SlabListItem = {
  id: string
  sku: string
  species: string
  breedSlug: string
  size: string
  price: string
  priceRub: number
  woodClass: WoodTextureDto
  stockStatus: StockStatusDto
  featured: boolean
}

export type SlabDetail = SlabListItem & {
  lengthCm: number
  widthCm: number
  thicknessCm: number
  weightKg: number | null
  origin: string | null
  description: string | null
  dryingMethod: string | null
  moisturePercent: string | null
  edgeTreatment: string | null
  gallery: WoodTextureDto[]
  breed: {
    slug: string
    name: string
    latinName: string
  }
}

export type WorkItem = {
  id: string
  title: string
  species: string
  size: string
  category: WorkCategoryDto
  categoryLabel: string
  woodClass: WoodTextureDto
}

export type LeadCreated = {
  id: string
  status: 'NEW'
  createdAt: string
}

export type PaginationMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type ApiSuccess<T> = {
  data: T
  meta?: PaginationMeta
}

export type ApiErrorBody = {
  error: {
    code: string
    message: string
    details?: unknown
  }
}
