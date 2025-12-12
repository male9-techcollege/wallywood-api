/* KILDER FOR DEN FØLGENDE KODE:
- Everride codealongs og mine tilhørende øvelser (version 6 i TypeScript)
  Note: teacher's code from Everride codealongs can be found at https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong 
- Moodle
- ... */

/* TypeScript only syntax in package.json file (these do not work in project without TS):
"prisma:generate": "prisma generate",
"prisma:migrate": "prisma migrate dev",
"prisma:reset": "prisma migrate reset",
"prisma:seed": "prisma db seed"
Source: Moodle
*/

/* Express is not a built-in Node.js module. It is an optional server framework. 
"Den store forskel på Express og de indbyggede server moduler ligger i, at vi ikke definerer en request i Express. Vi definerer mange! Nemlig en per url."
https://moodle.techcollege.dk/course/section.php?id=282537

"Npm er en forkortelse for Node Package Manager og er et værktøj der gør det muligt for JavaScript-udviklere at genbruge og dele små pakker af kode med andre.
Disse pakker kaldes også for moduler. (...)
Alle npm pakker er beskrevet og kan hentes fra npmjs.com. Da der ikke kvalitetskontrol bør du være opmærksom på pakkernes status i forhold til anvendelse og ratings. (...)

Desuden opdateres konfigurationsfilerne package.json og package-lock.json med de installerede moduler og deres versionsnummer.
Konfigurationsfilerne er vigtige altid at få med når vi vil dele vores kode på eksempelvis Github. De betyder nemlig at vi nemt kan geninstallere lige præcis de nødvendige moduler og deres versioner. Og dermed undgår vi også at skulle dele den til tider meget datatunge folder node_modules.

Så husk altid at tilføje node_modules til jeres .gitignore fil."
https://moodle.techcollege.dk/course/section.php?id=282536
*/
/* Default import from express */
import express from "express";
/* Default import from "dotenv" 
The .env file is useful for credentials. 
"Dotenv er et npm-bibliotek, der gør det muligt at indlæse miljøvariabler fra en .env-fil til Node.js-applikationer."
Source: Moodle, page entitled "DOTENV biblioteket" */
import dotenv from "dotenv";
import { userRouterByMariePierreLessard } from "./routes/userRoutes.js";
import { loginRouterByMariePierreLessard } from "./routes/loginRoutes.js";
import { authRouterByMariePierreLessard } from "./routes/authRoutes.js";
import { posterRouterByMariePierreLessard } from "./routes/posterRoutes.js";
import { genreRouterByMariePierreLessard } from "./routes/genreRoutes.js";
import { gprelRouterByMariePierreLessard } from "./routes/gprelRoutes.js";
import { cartRouterByMariePierreLessard } from "./routes/cartRoutes.js";
import { ratingRouterByMariePierreLessard } from "./routes/ratingRoutes.js";
/* Maybe TO DO: use 
import { errorRouterByMariePierreLessard } from "./routes/errorRoutes.js";
import { legalPagesRouterByMariePierreLessard } from "./routes/legalRoutes.js";
import { dealershipRouterByMariePierreLessard } from "./routes/dealershipRoutes.js";
*/

/* Initialiser dotenv config
Indsæt nedenstående i din index.js fil for at kalde config metoden på dotenv objektet og dermed indlæse .env filens variabler ind i node miljøet:
https://moodle.techcollege.dk/course/section.php?id=282538
*/
// TS-version: Indlæs miljøvariabler fra .env (uden at vise logs)
dotenv.config({ quiet: true });
// console.log(process.env.DATABASE_URL);

/*  Kald variabler på process.env
Nu kan du tilgå variablerne fra .env filen ved at kalde deres key name på objektet process.env:
https://moodle.techcollege.dk/course/section.php?id=282538
*/
/* || 3000 creates a fallback server port in case the key SERVERPORT (and therefore its value) are not found in .env file.  */
const port = process.env.SERVERPORT || 3000;

/* The following initialises Express in CommonJS modules.
This declaration was not in the codealong, but in instructions at https://expressjs.com (it's commonJs and doesn't work with ES modules) 
const express = require("express");
"As with almost everything in life, and especially in JavaScript, there are many ways for us to implement modules. (...)
Of the many available, we're only going to take a look at CommonJS and ESmodules, which are the most recent and widely used ones."
https://www.freecodecamp.org/news/modules-in-javascript/
The following is the equivalent code for ES modules acc. to teacher and "Express Crash Course" by Traversy Media on YouTube at https://m.youtube.com/watch?v=CnH3kAXSrmU 
*/
const serverAppByMariePierreLessard = express();
/* urlencoded corresponds to the test method we are taught to use in Postman;
there are other options, which also correspond to other test methods in Postman, e.g.:
serverAppByMariePierreLessard.use(express.json());
in order to send raw JSON from Postman.
See "Express Crash Course" by Traversy Media on YouTube at https://m.youtube.com/watch?v=CnH3kAXSrmU 
and Express + TypeScript instructions on Moodle at https://moodle.techcollege.dk/course/section.php?id=284926 */
// Gør det muligt at modtage form-data (fx fra formularer)
serverAppByMariePierreLessard.use(express.urlencoded({ extended: true }));
// Gør det muligt at modtage JSON i requests
serverAppByMariePierreLessard.use(express.json());

/* "Ved at bruge metoden get i Express kan vi sætte en listener op for hver enkelt url og definere hvilket svar, serveren skal give de enkelte forespørgsler. Dermed kan vi nemmere håndtere hvilke sider brugerne må og kan se og omvendt. Det kaldes også routing i moderne fagsprog."
https://moodle.techcollege.dk/course/section.php?id=282537 
It's easier to test in the browser with .get than with other HTTP-request methods. */
/* This calls root route with request and response object. 
   "/" is a synonym for root. */
/* Troubleshooting: 
now that I added api to the root "/", the index file is no longer found at the address http://localhost:${port}
The new address is http://localhost:${port}/api */
serverAppByMariePierreLessard.get("/api", (request, response) => {
    /* The following only gets printed to the console or displayed in browser when serverAppByMariePierreLessard is called.
    To call serverAppByMariePierreLessard, first I have to start the server, e.g. by typing run start in the terminal, 
    and then I use CTRL+click on the URL in the terminal. */
    response.send("Velkommen til Wallywood! Vi sælger både nye og gamle filmplakater i alle genrer."); //To see text in browser
    console.log("Velkommen til Wallywood! Vi sælger både nye og gamle filmplakater i alle genrer."); //To see text in terminal
    // console.log(request); //To see text in terminal
});

/* On large sites, it is advisable to create JS files for endpoints (routes) in each section, otherwise the list gets very long. 
The following says that <name>Router is called at the endpoint /<names>. 
Middleware (like <name>Router) is code that gets implemented between "the incoming request and the outgoing response" acc. to "Express Crash Course" by Traversy Media on YouTube at https://m.youtube.com/watch?v=CnH3kAXSrmU */
serverAppByMariePierreLessard.use("/api/users", userRouterByMariePierreLessard);
serverAppByMariePierreLessard.use("/api/login", loginRouterByMariePierreLessard);
serverAppByMariePierreLessard.use("/api/auth", authRouterByMariePierreLessard);
serverAppByMariePierreLessard.use("/api/posters", posterRouterByMariePierreLessard);
serverAppByMariePierreLessard.use("/api/genres", genreRouterByMariePierreLessard);
serverAppByMariePierreLessard.use("/api/gprel", gprelRouterByMariePierreLessard);
serverAppByMariePierreLessard.use("/api/cart", cartRouterByMariePierreLessard);
serverAppByMariePierreLessard.use("/api/ratings", ratingRouterByMariePierreLessard);
/* TO DO: maybe add...

FEJLSSIDER til at håndtere brugerforespørgsler på sider som ikke er sat op i din router (404 requests):
Se eksempel på
https://github.com/expressjs/express/blob/master/examples/error-pages/index.js
(Fundet via https://expressjs.com/en/starter/examples.html)

serverAppByMariePierreLessard.use("/api/errors", errorRouterByMariePierreLessard);
serverAppByMariePierreLessard.use("/api/legal", legalPagesRouterByMariePierreLessard);
serverAppByMariePierreLessard.use("/api/dealerships", dealershipRouterByMariePierreLessard);
*/

/* To check if access is given at that port.
1. Start server in terminal.
2. Open link in browser */
/* When I had the following mistake in the code, 
Windows Explorer opened instead of the browser 
when I used CTRL+click on link in the console. 
(Dot instead of a colon)
http://localhost.${port}
*/
serverAppByMariePierreLessard.listen(port, () => {
    console.log(`Express-server kører på http://localhost:${port}/api`);
});
