/* KILDER FOR DEN FØLGENDE KODE:
- Prisma
- Everride codealongs
*/
//Prisma singleton (importation of Prisma Client)
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
