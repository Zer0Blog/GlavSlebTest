# Архитектура: БД и API

## Обзор

```
┌─────────────┐     fetch      ┌──────────────────┐     Prisma     ┌────────────┐
│  Next.js    │ ─────────────► │  app/api/v1/*    │ ─────────────► │ PostgreSQL │
│  (UI)       │                │  Route Handlers  │                │            │
└─────────────┘                └────────┬─────────┘                └────────────┘
                                        │
                               ┌────────▼─────────┐
                               │ lib/services/* │  бизнес-логика
                               │ lib/validators │  Zod
                               │ lib/types/api  │  DTO
                               └────────────────┘
```

Слои не смешиваются: роуты только парсят запрос и вызывают сервисы; сервисы не знают про HTTP.

## База данных

**PostgreSQL 16** (локально через Docker).

| Модель | Назначение |
|--------|------------|
| `Breed` | Справочник пород |
| `Slab` | Слэбы каталога |
| `SlabImage` | Галерея текстур/фото на карточке |
| `Work` | Портфолио готовых изделий |
| `Lead` | Заявки с форм |

### Стек

- **PostgreSQL 16** + **Prisma ORM 7** (`@prisma/adapter-pg`)
- Конфиг CLI: `prisma.config.ts` (URL БД, seed)
- Клиент генерируется в `lib/generated/prisma` (`npm run db:generate`)

### Запуск БД

```bash
cp .env.example .env
docker compose up -d          # нужен запущенный Docker
npm run db:migrate          # применить миграции
npm run db:seed             # залить породы, слэбы, работы
npm run dev
```

Проверка: `curl http://localhost:3000/api/v1/health`

Если Docker недоступен — подставьте любой PostgreSQL в `DATABASE_URL` и выполните `db:migrate` + `db:seed`.

## REST API v1

Базовый путь: `/api/v1`

### Формат ответа

Успех:

```json
{
  "data": { ... },
  "meta": { "page": 1, "limit": 24, "total": 12, "totalPages": 1 }
}
```

Ошибка:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Некорректные данные",
    "details": { ... }
  }
}
```

### Эндпоинты

| Метод | Путь | Описание |
|-------|------|----------|
| `GET` | `/health` | Проверка API и БД |
| `GET` | `/breeds` | Список пород |
| `GET` | `/breeds/:slug` | Порода по slug |
| `GET` | `/slabs` | Каталог (фильтры, пагинация) |
| `GET` | `/slabs/:sku` | Карточка слэба |
| `GET` | `/slabs/:sku/related` | Похожие слэбы |
| `GET` | `/works` | Работы (`?category=TABLES`) |
| `POST` | `/leads` | Создать заявку |

### Query-параметры `/slabs`

| Параметр | Пример | Описание |
|----------|--------|----------|
| `breed` | `oak` | slug породы |
| `stock` | `IN_STOCK` | наличие |
| `sort` | `price_asc` | сортировка |
| `page` | `1` | страница |
| `limit` | `24` | размер страницы (max 48) |
| `featured` | `true` | только избранные |
| `minLength`, `maxLength` | `180` | длина, см |
| `minThickness`, `maxThickness` | `5` | толщина, см |

### POST `/leads`

```json
{
  "name": "Иван",
  "contact": "+79991234567",
  "message": "Интересует слэб",
  "source": "MODAL",
  "slabSku": "1247"
}
```

`source`: `MODAL` | `CONTACTS` | `PRODUCT` | `OTHER`

## Клиент на фронте

```ts
import { api } from '@/lib/api/client'

const { items, meta } = await api.slabs.list({ breed: 'oak', page: 1 })
await api.leads.create({ name, contact, source: 'CONTACTS' })
```

## Следующие шаги (не сделано)

1. Подключить страницы к API вместо констант в `page.tsx`
2. Admin-панель или CMS для слэбов
3. Загрузка реальных фото в S3 + `SlabImage.url`
4. Rate limit на `POST /leads`
5. Уведомления в Telegram при новой заявке

## Файловая структура

```
prisma/
  schema.prisma      # схема
  seed.ts            # начальные данные
  migrations/        # миграции

lib/
  db/prisma.ts       # singleton клиент
  domain/wood.ts     # форматирование, wood-N классы
  services/          # breeds, slabs, works, leads
  validators/        # Zod-схемы
  types/api.ts       # публичные типы
  api/
    response.ts      # jsonOk, jsonError
    client.ts        # fetch-обёртка

app/api/v1/          # Route Handlers
```
