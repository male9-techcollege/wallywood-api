/* KILDER FOR DEN FØLGENDE KODE:
- Everride codealongs og mine tilhørende øvelser (version 6 i TypeScript)
  Note: teacher's code from Everride codealongs can be found at https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong
- Moodle
- ... */
/* Se tilhørende kommentarer i posterRoutes.ts/.js */
import { Router } from "express";
import { loginByMariePierreLessard } from "../controllers/loginController.js";
const router = Router();
router.post("/", loginByMariePierreLessard);
export { router as loginRouterByMariePierreLessard };
