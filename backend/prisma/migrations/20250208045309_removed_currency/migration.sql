/*
  Warnings:

  - You are about to drop the column `currency` on the `Shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "currency";

-- DropEnum
DROP TYPE "Currency";
