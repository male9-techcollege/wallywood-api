/* KILDER FOR DEN FØLGENDE KODE:
- Everride codealongs og mine tilhørende øvelser (version 6 i TypeScript)
  Note: teacher's code from Everride codealongs can be found at https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong
- Moodle
- ... */
/* Se tilhørende kommentarer i posterRoutes.ts/.js */
import { Router } from "express";
import { createRecordByMariePierreLessard, getRecordsByMariePierreLessard, getRecordByMariePierreLessard, updateRecordByMariePierreLessard, deleteRecordByMariePierreLessard } from "../controllers/ratingController.js";
import { authenticateTokenByMariePierreLessard } from "../middleware/authenticateToken.js";
import { authoriseRoleByMariePierreLessard } from "../middleware/authorizeRole.js";
const routerByMariePierreLessard = Router();
routerByMariePierreLessard.post("/", authenticateTokenByMariePierreLessard, authoriseRoleByMariePierreLessard("ADMIN", "USER"), createRecordByMariePierreLessard);
routerByMariePierreLessard.get("/", getRecordsByMariePierreLessard);
routerByMariePierreLessard.get("/:id", getRecordByMariePierreLessard);
routerByMariePierreLessard.put("/:id", authenticateTokenByMariePierreLessard, authoriseRoleByMariePierreLessard("ADMIN", "USER"), updateRecordByMariePierreLessard);
routerByMariePierreLessard.delete("/:id", authenticateTokenByMariePierreLessard, authoriseRoleByMariePierreLessard("ADMIN", "USER"), deleteRecordByMariePierreLessard);
export { routerByMariePierreLessard as ratingRouterByMariePierreLessard };
