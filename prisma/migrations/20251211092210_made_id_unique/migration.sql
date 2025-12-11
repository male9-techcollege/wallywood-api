/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `CartLine` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `GenrePosterRel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `UserRating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `CartLine_id_key` ON `CartLine`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `GenrePosterRel_id_key` ON `GenrePosterRel`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `UserRating_id_key` ON `UserRating`(`id`);
