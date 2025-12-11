/* KILDER FOR DEN FØLGENDE KODE:
- Everride codealongs og mine tilhørende øvelser (version 6 i TypeScript)
  Note: teacher's code from Everride codealongs can be found at https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong 
- Moodle
- ... */
import { Request, Response } from "express";
import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";

/**
 * Method createRecord
 * @param req 
 * @param res 
 * @returns Object
Source of comment: https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong/blob/main/src/controllers/carController.ts
 */
export const createRecordByMariePierreLessard = async (req: Request, res: Response) => {
    console.log(req.body);

    const { firstname, lastname, email, password, role, isActive, createdOn } = req.body;

    if (!firstname || !lastname || !email || !password || !role || !isActive || !createdOn) {
        return res.status(400).json({ error: "Fejl 400: alle felter skal udfyldes." });
    };

    try {
        /* For security reasons,
        the passwords always have to be encrypted before they are saved in the database.
        The following encryption is done with the bcrypt Node.js package. */
        const hashedPassword = await bcrypt.hash(password, 10);

        const data = await prisma.user.create({
            data: {
                firstname, 
                lastname, 
                email, 
                password: hashedPassword, 
                role, 
                isActive: Boolean (isActive), 
                createdOn: new Date(createdOn)
            }
        });

        const dataWithIdByMariePierreLessard = {
           id: data.id,
           firstname, 
           lastname, 
           email, 
           password, 
           role, 
           isActive, 
           createdOn
       };
       console.log(dataWithIdByMariePierreLessard); //It worked in the Everride project. 
       return res.status(201).json(dataWithIdByMariePierreLessard);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Fejl 500: noget gik galt på serveren." });
    };
};

/**
 * Method getRecords
 * @param req 
 * @param res 
 * @returns Array
 Source of comment: https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong/blob/main/src/controllers/carController.ts
 */
export const getRecordsByMariePierreLessard = async (req: Request, res: Response) => {
    try {
        const data = await prisma.user.findMany({
            select: {
                id: true,
                firstname: true, 
                lastname: true, 
                email: true, 
                password: true, 
                role: true, 
                isActive: true,
                createdOn: true,
                /* Each of the following serves the purpose of showing an array from another table. */
                cartLines: true,
                userRatings: true
            },
            orderBy: {
                lastname: "asc"
            }
        });
        console.log("The user controller is returning: ", data);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Fejl 500: kunne ikke hente liste af brugere fra databasen.`);
    };
};

/**
 * Method getRecord
 * @param req 
 * @param res 
 * @returns Object
Source of comment: https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong/blob/main/src/controllers/carController.ts
*/
export const getRecordByMariePierreLessard = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!id) {
        return res.status(400).json({ error: "Fejl 400: id har ingen værdi." });
    };

    try {
        const data = await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                password: true,
                role: true,
                isActive: true,
                createdOn: true,
                /* Each of the following serves the purpose of showing an array from another table. */
                cartLines: true,
                userRatings: true
            },
        });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fejl 500: kunne ikke hente brugeren fra databasen." });
    }
};

export const updateRecordByMariePierreLessard = async (req: Request, res: Response) => {

    const id = Number(req.params.id);
    /* In order to avoid a double encryption, we are leaving out the password field. 
    The password will have to be updated separately. 
    A double encryption is an encryption of sth already encryted. This event makes the password unusable since it is very difficult or impossible to restore it. */
    const { firstname, lastname, email, role, isActive, createdOn } = req.body; 

    if (!id) {
        return res.status(400).json({ error: "Fejl 400: id skal have en gyldig værdi." });
    };

    if (!firstname || !lastname || !email || !role || !isActive || !createdOn) {
        return res.status(400).json({ error: "Fejl 400: alle felter skal udfyldes." });
    };

    try {
        const data = await prisma.user.update({
            where: { id },
            data: {
                firstname,
                lastname,
                email,
                /* Leave out password field to avoid double encryption 
                Maybe TO DO: a method to update password only */
                role,
                isActive: Boolean (isActive),
                createdOn: new Date(createdOn)
            }
        });

        return res.status(201).json(data);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Fejl 500: noget gik galt i serveren." });
    };
};

export const deleteRecordByMariePierreLessard = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!id) {
        return res.status(400).json({ error: "Fejl 400: id har ingen værdi." });
    };

    try {
        await prisma.user.delete({
            where: { id },
        });

        res.status(200).json({ message: `Brugeren nr. ${id} er slettet.`, deletedId: id });
 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fejl 500: kunne ikke slette brugeren i databasen." });
    };
};

