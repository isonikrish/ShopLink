/*
  Warnings:

  - You are about to drop the column `sku` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Variant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "stock" INTEGER;

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "sku",
DROP COLUMN "stock";
