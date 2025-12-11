/* KILDER FOR DEN FØLGENDE KODE:
- Everride codealongs og mine tilhørende øvelser (version 6 i TypeScript)
  Note: teacher's code from Everride codealongs can be found at https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong 
- Moodle
- ... */
import { Router } from "express";
import { authenticateTokenByMariePierreLessard } from "../middleware/authenticateToken.js";
import { authoriseRoleByMariePierreLessard } from "../middleware/authorizeRole.js";
import { getUserProfileByMariePierreLessard } from "../controllers/authController.js";

const router = Router();

// Først kører authenticateToken (tjekker om token er gyldig).
// Hvis token er OK, kører den næste funktion og så den næste. Den sidste funktion returnerer brugerens data. 
router.get("/", authenticateTokenByMariePierreLessard, authoriseRoleByMariePierreLessard("ADMIN", "USER"), getUserProfileByMariePierreLessard);

export { router as authRouterByMariePierreLessard };