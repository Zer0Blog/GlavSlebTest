import type { Prisma, Slab, Breed, SlabImage, WoodTexture } from '@/lib/generated/prisma/client'
import { prisma } from '@/lib/db/prisma'
import { formatPriceRub, formatSlabSize, woodTextureToClass } from '@/lib/domain/wood'
import type { ListSlabsQuery } from '@/lib/validators/slabs'
import type { SlabDetail, SlabListItem, WoodTextureDto } from '@/lib/types/api'

type SlabWithBreed = Slab & { breed: Breed }
type SlabFull = SlabWithBreed & { images: SlabImage[] }

function mapSlabListItem(slab: SlabWithBreed): SlabListItem {
  return {
    id: slab.id,
    sku: slab.sku,
    species: slab.breed.name,
    breedSlug: slab.breed.slug,
    size: formatSlabSize(slab.lengthCm, slab.widthCm, slab.thicknessCm),
    price: formatPriceRub(slab.priceRub),
    priceRub: slab.priceRub,
    woodClass: woodTextureToClass(slab.woodTexture) as WoodTextureDto,
    stockStatus: slab.stockStatus,
    featured: slab.featured,
  }
}

function mapSlabDetail(slab: SlabFull): SlabDetail {
  const gallery =
    slab.images.length > 0
      ? slab.images
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map(img => woodTextureToClass((img.texture ?? slab.woodTexture) as WoodTexture) as WoodTextureDto)
      : [woodTextureToClass(slab.woodTexture) as WoodTextureDto]

  return {
    ...mapSlabListItem(slab),
    lengthCm: slab.lengthCm,
    widthCm: slab.widthCm,
    thicknessCm: slab.thicknessCm,
    weightKg: slab.weightKg,
    origin: slab.origin,
    description: slab.description,
    dryingMethod: slab.dryingMethod,
    moisturePercent: slab.moisturePercent,
    edgeTreatment: slab.edgeTreatment,
    gallery,
    breed: {
      slug: slab.breed.slug,
      name: slab.breed.name,
      latinName: slab.breed.latinName,
    },
  }
}

function buildWhere(query: ListSlabsQuery): Prisma.SlabWhereInput {
  const where: Prisma.SlabWhereInput = { published: true }

  if (query.breed) {
    where.breed = { slug: query.breed }
  }
  if (query.stock) {
    where.stockStatus = query.stock
  }
  if (query.featured !== undefined) {
    where.featured = query.featured
  }
  if (query.minLength ?? query.maxLength) {
    where.lengthCm = {}
    if (query.minLength) where.lengthCm.gte = query.minLength
    if (query.maxLength) where.lengthCm.lte = query.maxLength
  }
  if (query.minThickness ?? query.maxThickness) {
    where.thicknessCm = {}
    if (query.minThickness) where.thicknessCm.gte = query.minThickness
    if (query.maxThickness) where.thicknessCm.lte = query.maxThickness
  }

  return where
}

function buildOrderBy(sort: ListSlabsQuery['sort']): Prisma.SlabOrderByWithRelationInput[] {
  switch (sort) {
    case 'price_asc':
      return [{ priceRub: 'asc' }]
    case 'price_desc':
      return [{ priceRub: 'desc' }]
    case 'size_desc':
      return [{ lengthCm: 'desc' }, { widthCm: 'desc' }]
    default:
      return [{ featured: 'desc' }, { createdAt: 'desc' }]
  }
}

export async function listSlabs(query: ListSlabsQuery) {
  const where = buildWhere(query)
  const skip = (query.page - 1) * query.limit

  const [total, slabs] = await Promise.all([
    prisma.slab.count({ where }),
    prisma.slab.findMany({
      where,
      orderBy: buildOrderBy(query.sort),
      skip,
      take: query.limit,
      include: { breed: true },
    }),
  ])

  return {
    items: slabs.map(mapSlabListItem),
    meta: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / query.limit)),
    },
  }
}

export async function getSlabBySku(sku: string): Promise<SlabDetail | null> {
  const slab = await prisma.slab.findFirst({
    where: { sku, published: true },
    include: { breed: true, images: true },
  })
  if (!slab) return null
  return mapSlabDetail(slab)
}

export async function getRelatedSlabs(breedId: string, excludeSku: string, limit = 4) {
  const slabs = await prisma.slab.findMany({
    where: { breedId, published: true, sku: { not: excludeSku } },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: { breed: true },
  })
  return slabs.map(mapSlabListItem)
}
