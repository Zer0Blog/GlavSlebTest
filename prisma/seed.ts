import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import {
  PrismaClient,
  WoodTexture,
  StockStatus,
  WorkCategory,
} from '../lib/generated/prisma/client'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const breeds = [
  {
    slug: 'oak',
    abbr: 'Дб',
    name: 'Дуб черешчатый',
    latinName: 'Quercus robur',
    tag: 'Твёрдость 3.7 кН',
    hardness: '3.7 кН',
    colorHex: '#8B6240',
    description:
      'Самая распространённая и востребованная порода. Плотная, твёрдая древесина с выраженным рисунком годовых колец.',
    woodTexture: WoodTexture.WOOD_3,
    sortOrder: 1,
  },
  {
    slug: 'cedar',
    abbr: 'Кд',
    name: 'Кедр ливанский',
    latinName: 'Cedrus libani',
    tag: 'Ароматная',
    hardness: '2.4 кН',
    colorHex: '#C49A6C',
    description: 'Ароматная смолистая древесина с золотисто-розовым оттенком. Устойчива к влаге.',
    woodTexture: WoodTexture.WOOD_2,
    sortOrder: 2,
  },
  {
    slug: 'plane',
    abbr: 'Пл',
    name: 'Платан восточный',
    latinName: 'Platanus orientalis',
    tag: 'Редкая',
    hardness: '3.1 кН',
    colorHex: '#A07850',
    description: 'Редкая порода с мраморным рисунком. Каждый слэб уникален.',
    woodTexture: WoodTexture.WOOD_1,
    sortOrder: 3,
  },
  {
    slug: 'sequoia',
    abbr: 'Св',
    name: 'Секвойя',
    latinName: 'Sequoiadendron giganteum',
    tag: 'Крупные слэбы',
    hardness: '2.2 кН',
    colorHex: '#7A4030',
    description: 'Древесина гигантских деревьев. Красно-коричневые оттенки.',
    woodTexture: WoodTexture.WOOD_3,
    sortOrder: 4,
  },
  {
    slug: 'ash',
    abbr: 'Яс',
    name: 'Ясень обыкновенный',
    latinName: 'Fraxinus excelsior',
    tag: 'Упругость',
    hardness: '4.0 кН',
    colorHex: '#C8A878',
    description: 'Прочная упругая порода. Отличный выбор для столешниц.',
    woodTexture: WoodTexture.WOOD_2,
    sortOrder: 5,
  },
  {
    slug: 'walnut',
    abbr: 'Ор',
    name: 'Орех грецкий',
    latinName: 'Juglans regia',
    tag: 'Премиум',
    hardness: '3.5 кН',
    colorHex: '#5C3A20',
    description: 'Благородная порода с глубоким шоколадным оттенком.',
    woodTexture: WoodTexture.WOOD_1,
    sortOrder: 6,
  },
] as const

type SlabSeed = {
  sku: string
  breedSlug: string
  lengthCm: number
  widthCm: number
  thicknessCm: number
  priceRub: number
  woodTexture: WoodTexture
  featured?: boolean
  stockStatus?: StockStatus
}

const slabs: SlabSeed[] = [
  { sku: '1247', breedSlug: 'oak', lengthCm: 240, widthCm: 96, thicknessCm: 8, priceRub: 85000, woodTexture: WoodTexture.WOOD_3, featured: true },
  { sku: '0891', breedSlug: 'plane', lengthCm: 180, widthCm: 74, thicknessCm: 6, priceRub: 62000, woodTexture: WoodTexture.WOOD_1 },
  { sku: '0534', breedSlug: 'cedar', lengthCm: 210, widthCm: 88, thicknessCm: 7, priceRub: 74000, woodTexture: WoodTexture.WOOD_2 },
  { sku: '0712', breedSlug: 'sequoia', lengthCm: 320, widthCm: 110, thicknessCm: 9, priceRub: 120000, woodTexture: WoodTexture.WOOD_3 },
  { sku: '1102', breedSlug: 'ash', lengthCm: 195, widthCm: 82, thicknessCm: 5, priceRub: 48000, woodTexture: WoodTexture.WOOD_1 },
  { sku: '1190', breedSlug: 'oak', lengthCm: 260, widthCm: 105, thicknessCm: 9, priceRub: 95000, woodTexture: WoodTexture.WOOD_3 },
  { sku: '0920', breedSlug: 'plane', lengthCm: 200, widthCm: 88, thicknessCm: 7, priceRub: 70000, woodTexture: WoodTexture.WOOD_2 },
  { sku: '0601', breedSlug: 'cedar', lengthCm: 185, widthCm: 76, thicknessCm: 6, priceRub: 58000, woodTexture: WoodTexture.WOOD_1 },
  { sku: '1175', breedSlug: 'oak', lengthCm: 180, widthCm: 72, thicknessCm: 5, priceRub: 48000, woodTexture: WoodTexture.WOOD_1 },
  { sku: '0333', breedSlug: 'ash', lengthCm: 220, widthCm: 90, thicknessCm: 6, priceRub: 55000, woodTexture: WoodTexture.WOOD_2 },
  { sku: '0450', breedSlug: 'sequoia', lengthCm: 290, widthCm: 98, thicknessCm: 8, priceRub: 110000, woodTexture: WoodTexture.WOOD_3 },
  { sku: '0780', breedSlug: 'oak', lengthCm: 200, widthCm: 84, thicknessCm: 7, priceRub: 76000, woodTexture: WoodTexture.WOOD_2 },
  { sku: '1248', breedSlug: 'oak', lengthCm: 195, widthCm: 80, thicknessCm: 6, priceRub: 62000, woodTexture: WoodTexture.WOOD_1 },
  { sku: '1205', breedSlug: 'oak', lengthCm: 220, widthCm: 92, thicknessCm: 7, priceRub: 78000, woodTexture: WoodTexture.WOOD_2 },
]

const works: {
  title: string
  species: string
  sizeLabel: string
  category: WorkCategory
  woodTexture: WoodTexture
}[] = [
  { title: 'Обеденный стол', species: 'Дуб черешчатый', sizeLabel: '200×90 см', category: WorkCategory.TABLES, woodTexture: WoodTexture.WOOD_3 },
  { title: 'Барная стойка', species: 'Секвойя', sizeLabel: '320×60 см', category: WorkCategory.BAR, woodTexture: WoodTexture.WOOD_1 },
  { title: 'Столешница', species: 'Платан', sizeLabel: '180×80 см', category: WorkCategory.COUNTERTOPS, woodTexture: WoodTexture.WOOD_2 },
  { title: 'Журнальный стол', species: 'Кедр', sizeLabel: '120×70 см', category: WorkCategory.TABLES, woodTexture: WoodTexture.WOOD_1 },
  { title: 'Кухонная столешница', species: 'Ясень', sizeLabel: '240×65 см', category: WorkCategory.COUNTERTOPS, woodTexture: WoodTexture.WOOD_3 },
  { title: 'Консоль', species: 'Орех', sizeLabel: '160×40 см', category: WorkCategory.OTHER, woodTexture: WoodTexture.WOOD_2 },
  { title: 'Столешница-эпоксид', species: 'Дуб + эпоксид', sizeLabel: '200×90 см', category: WorkCategory.COUNTERTOPS, woodTexture: WoodTexture.WOOD_3 },
  { title: 'Стол-река', species: 'Платан', sizeLabel: '280×100 см', category: WorkCategory.TABLES, woodTexture: WoodTexture.WOOD_1 },
]

async function main() {
  console.log('🌱 Seeding database...')

  await prisma.lead.deleteMany()
  await prisma.slabImage.deleteMany()
  await prisma.slab.deleteMany()
  await prisma.work.deleteMany()
  await prisma.breed.deleteMany()

  const breedMap = new Map<string, string>()

  for (const b of breeds) {
    const breed = await prisma.breed.create({ data: b })
    breedMap.set(b.slug, breed.id)
  }

  for (const s of slabs) {
    const breedId = breedMap.get(s.breedSlug)
    if (!breedId) throw new Error(`Unknown breed: ${s.breedSlug}`)

    const slab = await prisma.slab.create({
      data: {
        sku: s.sku,
        breedId,
        lengthCm: s.lengthCm,
        widthCm: s.widthCm,
        thicknessCm: s.thicknessCm,
        priceRub: s.priceRub,
        woodTexture: s.woodTexture,
        stockStatus: s.stockStatus ?? StockStatus.IN_STOCK,
        featured: s.featured ?? false,
        weightKg: Math.round(s.lengthCm * s.widthCm * s.thicknessCm / 1200),
        origin: s.sku === '1247' ? 'ул. Навагинская, Сочи · 2021' : 'Сочи',
        description:
          s.sku === '1247'
            ? 'Этот дуб рос в центре Сочи более 80 лет. Выраженные годовые кольца, живые края.'
            : null,
        dryingMethod: 'Камерная, 2 года',
        moisturePercent: '8–10%',
        edgeTreatment: 'Залиты эпоксидом',
      },
    })

    if (s.sku === '1247') {
      await prisma.slabImage.createMany({
        data: [
          { slabId: slab.id, texture: WoodTexture.WOOD_3, sortOrder: 0 },
          { slabId: slab.id, texture: WoodTexture.WOOD_1, sortOrder: 1 },
          { slabId: slab.id, texture: WoodTexture.WOOD_2, sortOrder: 2 },
          { slabId: slab.id, texture: WoodTexture.WOOD_3, sortOrder: 3 },
        ],
      })
    }
  }

  for (let i = 0; i < works.length; i++) {
    await prisma.work.create({
      data: { ...works[i], sortOrder: i },
    })
  }

  console.log(`✅ ${breeds.length} breeds, ${slabs.length} slabs, ${works.length} works`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
