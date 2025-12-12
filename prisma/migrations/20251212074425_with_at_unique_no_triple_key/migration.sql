/*
  Warnings:

  - The primary key for the `cartline` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `genreposterrel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `userrating` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `cartline` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`user_id`, `poster_id`);

-- AlterTable
ALTER TABLE `genreposterrel` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`genre_id`, `poster_id`);

-- AlterTable
ALTER TABLE `userrating` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`user_id`, `poster_id`);
