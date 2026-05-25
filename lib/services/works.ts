import type { Work } from '@/lib/generated/prisma/client'
import { prisma } from '@/lib/db/prisma'
import { woodTextureToClass, WORK_CATEGORY_LABELS } from '@/lib/domain/wood'
import type { WorkItem, WoodTextureDto, WorkCategoryDto } from '@/lib/types/api'

function mapWork(work: Work): WorkItem {
  return {
    id: work.id,
    title: work.title,
    species: work.species,
    size: work.sizeLabel,
    category: work.category as WorkCategoryDto,
    categoryLabel: WORK_CATEGORY_LABELS[work.category] ?? work.category,
    woodClass: woodTextureToClass(work.woodTexture) as WoodTextureDto,
  }
}

export async function listWorks(category?: WorkCategoryDto) {
  const works = await prisma.work.findMany({
    where: {
      published: true,
      ...(category ? { category } : {}),
    },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  })
  return works.map(mapWork)
}
