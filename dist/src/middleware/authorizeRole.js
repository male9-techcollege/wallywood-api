/* KILDER FOR DEN FØLGENDE KODE:
- Everride codealongs og mine tilhørende øvelser (version 6 i TypeScript)
  Note: teacher's code from Everride codealongs can be found at https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong
- Moodle
- ... */
// Funktionen kan kaldes med en eller flere roller som parameter
/* "The spread (...) syntax allows an iterable, such as an array or string, to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected. In an object literal, the spread syntax enumerates the properties of an object and adds the key-value pairs to the object being created.
Spread syntax looks exactly like rest syntax. In a way, spread syntax is the opposite of rest syntax. Spread syntax "expands" an array into its elements, while rest syntax collects multiple elements and "condenses" them into a single element. See rest parameters and rest property."
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
*/
export const authoriseRoleByMariePierreLessard = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;
        // Hvis authenticate ikke har sat user
        if (!user) {
            return res.status(401).json({ message: "Error 401: you are not logged in." });
        }
        ;
        // Hvis der ikke er sat nogen roller...
        if (allowedRoles.length === 0) {
            /* The following was in the Everride assignment, but the Wallywood assignment demands that access be restricted.
            return next();
            */
            console.log("Error 500: the required access roles are not defined.");
        }
        ;
        // Tjek om brugerens role er en af de tilladte
        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: "Error 403: you are not authorised to access this url." });
        }
        ;
        // Alt ok
        return next();
    };
};
