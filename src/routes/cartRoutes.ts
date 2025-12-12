/* KILDER FOR DEN FØLGENDE KODE:
- Everride codealongs og mine tilhørende øvelser (version 6 i TypeScript)
  Note: teacher's code from Everride codealongs can be found at https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong 
- Moodle
- ... */
/* Se tilhørende kommentarer i posterRoutes.ts/.js */
import { Router } from "express";
import { createRecordByMariePierreLessard, getRecordsByMariePierreLessard, getRecordByMariePierreLessard, updateRecordByMariePierreLessard, deleteRecordByMariePierreLessard } from "../controllers/cartController.js";

const routerByMariePierreLessard = Router();

routerByMariePierreLessard.post("/", createRecordByMariePierreLessard);

routerByMariePierreLessard.get("/", getRecordsByMariePierreLessard);

routerByMariePierreLessard.get("/:id", getRecordByMariePierreLessard);

routerByMariePierreLessard.put("/:id", updateRecordByMariePierreLessard);

routerByMariePierreLessard.delete("/:id", deleteRecordByMariePierreLessard);

export { routerByMariePierreLessard as cartRouterByMariePierreLessard };

