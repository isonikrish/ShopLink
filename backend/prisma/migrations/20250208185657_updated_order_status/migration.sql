/*
  Warnings:

  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'placed';
