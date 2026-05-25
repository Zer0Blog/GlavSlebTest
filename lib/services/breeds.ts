import type { Breed } from '@/lib/generated/prisma/client'
import { prisma } from '@/lib/db/prisma'
import { woodTextureToClass } from '@/lib/domain/wood'
import type { BreedDetail, BreedListItem, WoodTextureDto } from '@/lib/types/api'

function mapBreedBase(
  breed: Breed & { _count?: { slabs: number } },
): BreedListItem {
  return {
    id: breed.id,
    slug: breed.slug,
    abbr: breed.abbr,
    name: breed.name,
    latinName: breed.latinName,
    tag: breed.tag,
    hardness: breed.hardness,
    colorHex: breed.colorHex,
    woodClass: woodTextureToClass(breed.woodTexture) as WoodTextureDto,
    slabCount: breed._count?.slabs ?? 0,
  }
}

export async function listBreeds(): Promise<BreedListItem[]> {
  const breeds = await prisma.breed.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    include: { _count: { select: { slabs: { where: { published: true } } } } },
  })
  return breeds.map(mapBreedBase)
}

export async function getBreedBySlug(slug: string): Promise<BreedDetail | null> {
  const breed = await prisma.breed.findFirst({
    where: { slug, published: true },
    include: { _count: { select: { slabs: { where: { published: true } } } } },
  })
  if (!breed) return null
  return {
    ...mapBreedBase(breed),
    description: breed.description,
  }
}

export async function getBreedFilterOptions(): Promise<{ slug: string; name: string }[]> {
  const breeds = await prisma.breed.findMany({
    where: { published: true },
    orderBy: { name: 'asc' },
    select: { slug: true, name: true },
  })
  return breeds
}
