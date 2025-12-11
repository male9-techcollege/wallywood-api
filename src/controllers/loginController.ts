/* KILDER FOR DEN FØLGENDE KODE:
- Everride codealongs og mine tilhørende øvelser (version 6 i TypeScript)
  Note: teacher's code from Everride codealongs can be found at https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong 
- Moodle
- ... */
import { Request, Response } from "express";
import { loginUserByMariePierreLessard } from "../services/loginUser.js";

export const loginByMariePierreLessard = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        console.log({ email, password }); //This prints the object, and variable names are shown as the keys! Good trick.

        // Simpel validering
        if (!email || !password) {
            return res.status(400).json({ message: "Fejl 400: email og password er påkrævet." });
        };

        /* Else... if an email and a password exist,
        a call to the database will be made */
        const result = await loginUserByMariePierreLessard(email, password);
        console.log(result);

        //user and token are returned by imported function expression loginUserByMariePierreLessard (but they are called email and password above)
        return res.status(200).json({
            message: "Login succesfuld.",
            user: result.user,
            token: result.token
        });
    } catch (error: any) {
        console.error(error);
        return res.status(401).json({
            message: error.message || "Fejl 401: login fejlede."
        });
    };
};
