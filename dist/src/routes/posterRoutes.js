/* KILDER FOR DEN FØLGENDE KODE:
- Everride codealongs og mine tilhørende øvelser (version 6 i TypeScript)
  Note: teacher's code from Everride codealongs can be found at https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong
- Moodle
- ... */
/* Named import from express */
import { Router } from "express";
import { createRecordByMariePierreLessard, getRecordsByMariePierreLessard, getRecordByMariePierreLessard, updateRecordByMariePierreLessard, deleteRecordByMariePierreLessard } from "../controllers/posterController.js";
import { authenticateTokenByMariePierreLessard } from "../middleware/authenticateToken.js";
import { authoriseRoleByMariePierreLessard } from "../middleware/authorizeRole.js";
/* The purpose of the following is to avoid repetition on sites with lots of pages. */
const router = Router();
/* Since this uses the method POST instead of GET, there is no problem reusing the base URL (api/<name>).
(We first learned about GET, but the Everride exercises followed the letters in CRUD.)

In index.js, /api/<name> is given as the end point that is simply called / (a root) in the current module. It's the root of this particular router.
The point is to be able to efficiently subdivide by brand, etc.
*/
/* These are subroutes. The routes in index.js file are called base routes. */
router.post("/", authenticateTokenByMariePierreLessard, authoriseRoleByMariePierreLessard("ADMIN"), createRecordByMariePierreLessard);
//Thanks to Express, it is not necessary to include the arguments (req, res) (matching the params in the function expression called). Express does it for us.
router.get("/", getRecordsByMariePierreLessard);
/* Dynamic values: e.g. :id (no dollar sign here)
Before exercise and codealong in version 4 of Everride, the code to use was:
router.get("/:id", (req, res) => {
    const identifier = Number(req.params.id);
    // console.log(req.params.id);
    res.send(`Bildetaljer for ${identifier}`);
});

.send() :
"I praksis ville man normalt sende et HTTP-svar eller kalde en controller."
https://moodle.techcollege.dk/course/section.php?id=284745
*/
router.get("/:id", getRecordByMariePierreLessard);
router.put("/:id", authenticateTokenByMariePierreLessard, authoriseRoleByMariePierreLessard("ADMIN"), updateRecordByMariePierreLessard);
router.delete("/:id", authenticateTokenByMariePierreLessard, authoriseRoleByMariePierreLessard("ADMIN"), deleteRecordByMariePierreLessard);
/* Function expression "router" exported as an alias (<name>RouterByMariePierreLessard).
Other version on Moodle:
export const <name>Router = router */
export { router as posterRouterByMariePierreLessard };
