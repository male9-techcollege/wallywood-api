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
    console.log("Sider til afdelinger");
    res.send("Sider til afdelinger");
});
routerByMariePierreLessard.get("/jylland", (req, res) => {
    console.log("Sider til afdelinger i Jylland...");
    res.send("Sider til afdelinger i Jylland...");
});
routerByMariePierreLessard.get("/fyn", (req, res) => {
    console.log("Sider til afdelinger på Fyn...");
    res.send("Sider til afdelinger på Fyn...");
});
routerByMariePierreLessard.get("/sjaelland", (req, res) => {
    console.log("Sider til afdelinger på Sjælland...");
    res.send("Sider til afdelinger på Sjælland...");
});
export { routerByMariePierreLessard as dealershipRouterByMariePierreLessard };
