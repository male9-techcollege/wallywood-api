/* TO DO: review comments, rename function expressions and fields */
/* KILDER FOR DEN FØLGENDE KODE:
- Everride codealongs og mine tilhørende øvelser (version 6 i TypeScript)
  Note: teacher's code from Everride codealongs can be found at https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong
- Moodle
- ... */
/* EXERCISE after v3 */
import { Router } from "express";
const routerByMariePierreLessard = Router();
routerByMariePierreLessard.get("/", (req, res) => {
    console.log("Sider til fejlbeskeder");
    res.send("Sider til fejlbeskeder");
});
/* Tested: if I enter the address
http://localhost:4000/errors/404
I can see the text HTTP-response-status code: 404 */
routerByMariePierreLessard.get("/:code", (req, res) => {
    const httpResponseStatusCodeByMariePierreLessard = Number(req.params.code);
    console.log(req.params.code);
    res.send(`HTTP-response-status code: ${httpResponseStatusCodeByMariePierreLessard}`);
});
export { routerByMariePierreLessard as errorRouterByMariePierreLessard };
