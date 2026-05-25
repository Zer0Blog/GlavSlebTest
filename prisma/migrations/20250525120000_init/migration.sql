-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "WoodTexture" AS ENUM ('WOOD_1', 'WOOD_2', 'WOOD_3');

-- CreateEnum
CREATE TYPE "StockStatus" AS ENUM ('IN_STOCK', 'ON_ORDER', 'RESERVED', 'SOLD');

-- CreateEnum
CREATE TYPE "WorkCategory" AS ENUM ('TABLES', 'COUNTERTOPS', 'BAR', 'OTHER');

-- CreateEnum
CREATE TYPE "LeadSource" AS ENUM ('MODAL', 'CONTACTS', 'PRODUCT', 'OTHER');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'DONE', 'SPAM');

-- CreateTable
CREATE TABLE "breeds" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "abbr" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latin_name" TEXT NOT NULL,
    "tag" TEXT,
    "hardness" TEXT,
    "color_hex" TEXT,
    "description" TEXT NOT NULL,
    "wood_texture" "WoodTexture" NOT NULL DEFAULT 'WOOD_1',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "breeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slabs" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "breed_id" TEXT NOT NULL,
    "length_cm" INTEGER NOT NULL,
    "width_cm" INTEGER NOT NULL,
    "thickness_cm" INTEGER NOT NULL,
    "weight_kg" INTEGER,
    "price_rub" INTEGER NOT NULL,
    "wood_texture" "WoodTexture" NOT NULL,
    "stock_status" "StockStatus" NOT NULL DEFAULT 'IN_STOCK',
    "origin" TEXT,
    "description" TEXT,
    "drying_method" TEXT,
    "moisture_percent" TEXT,
    "edge_treatment" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slabs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slab_images" (
    "id" TEXT NOT NULL,
    "slab_id" TEXT NOT NULL,
    "url" TEXT,
    "texture" "WoodTexture",
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "slab_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "works" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "size_label" TEXT NOT NULL,
    "category" "WorkCategory" NOT NULL,
    "wood_texture" "WoodTexture" NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "works_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "message" TEXT,
    "source" "LeadSource" NOT NULL DEFAULT 'OTHER',
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "slab_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "breeds_slug_key" ON "breeds"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "slabs_sku_key" ON "slabs"("sku");

-- CreateIndex
CREATE INDEX "slabs_breed_id_idx" ON "slabs"("breed_id");

-- CreateIndex
CREATE INDEX "slabs_stock_status_idx" ON "slabs"("stock_status");

-- CreateIndex
CREATE INDEX "slabs_price_rub_idx" ON "slabs"("price_rub");

-- CreateIndex
CREATE INDEX "slabs_published_featured_idx" ON "slabs"("published", "featured");

-- CreateIndex
CREATE INDEX "slab_images_slab_id_idx" ON "slab_images"("slab_id");

-- CreateIndex
CREATE INDEX "works_category_idx" ON "works"("category");

-- CreateIndex
CREATE INDEX "leads_status_idx" ON "leads"("status");

-- CreateIndex
CREATE INDEX "leads_created_at_idx" ON "leads"("created_at");

-- AddForeignKey
ALTER TABLE "slabs" ADD CONSTRAINT "slabs_breed_id_fkey" FOREIGN KEY ("breed_id") REFERENCES "breeds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slab_images" ADD CONSTRAINT "slab_images_slab_id_fkey" FOREIGN KEY ("slab_id") REFERENCES "slabs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_slab_id_fkey" FOREIGN KEY ("slab_id") REFERENCES "slabs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
