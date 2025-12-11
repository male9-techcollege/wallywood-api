/* KILDER FOR DEN FØLGENDE KODE:
- Everride codealongs og mine tilhørende øvelser (version 6 i TypeScript)
  Note: teacher's code from Everride codealongs can be found at https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong 
- Moodle
- ... */
/* Se tilhørende kommentarer i posterRoutes.ts/.js */
import { Router } from "express";
import { createRecordByMariePierreLessard, getRecordsByMariePierreLessard, getRecordByMariePierreLessard, updateRecordByMariePierreLessard, deleteRecordByMariePierreLessard } from "../controllers/userController.js";

const router = Router();

router.post("/", createRecordByMariePierreLessard);

router.get("/", getRecordsByMariePierreLessard);

router.get("/:id", getRecordByMariePierreLessard);

router.put("/:id", updateRecordByMariePierreLessard);

router.delete("/:id", deleteRecordByMariePierreLessard);

export { router as userRouterByMariePierreLessard };

