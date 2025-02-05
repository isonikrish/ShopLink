/*
  Warnings:

  - You are about to drop the column `hasVariants` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Variant` table. All the data in the column will be lost.
  - Made the column `price` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "hasVariants",
ALTER COLUMN "price" SET NOT NULL;

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "price";
