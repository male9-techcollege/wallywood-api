/* TO DO: test */
/* KILDER FOR DEN FØLGENDE KODE:
- Everride codealongs og mine tilhørende øvelser (version 6 i TypeScript)
  Note: teacher's code from Everride codealongs can be found at https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong 
- Moodle
- ... */
/* Se tilhørende kommentarer i posterController.ts/.js og gprelController.ts/.js */
import { Request, Response } from "express";
import { prisma } from "../prisma.js";

export const createRecordByMariePierreLessard = async (req: Request, res: Response) => {
    console.log(req.body);

    const { user_id, poster_id, numStars, createdOn } = req.body;

    if (!user_id || !poster_id || !numStars || !createdOn) {
        return res.status(400).json({ error: "Fejl 400: alle felter skal udfyldes." });
    };

    try {
        const data = await prisma.userRating.create({
            data: {
                user_id: Number(user_id),
                poster_id: Number(poster_id), 
                numStars: Number(poster_id), 
                createdOn: new Date(createdOn)
            }
        });

        const dataWithIdByMariePierreLessard = {
            id: data.id,
            user_id,
            poster_id,
            numStars,
            createdOn
        };
        console.log(dataWithIdByMariePierreLessard); //It worked in the Everride project.
        return res.status(201).json(dataWithIdByMariePierreLessard);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Fejl 500: noget gik galt på serveren." });
    };
};

export const getRecordsByMariePierreLessard = async (req: Request, res: Response) => {
    try {
        const data = await prisma.userRating.findMany({
            select: {
                id: true,
                user_id: true,
                poster_id: true,
                numStars: true,
                createdOn: true
            },
            orderBy: {
                poster_id: "asc"
            }
        });
        console.log("The rating controller is returning: ", data);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Fejl 500: kunne ikke hente liste af vurderinger fra databasen.`);
    };
};

export const getRecordByMariePierreLessard = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    //console.log(id);

    if (!id) {
        return res.status(400).json({ error: "Fejl 400: id har ingen værdi." });
    };

    try {
        /* It is easier to find records with the @unique (not @id) id field in the model than to find the compound key! */
        const data = await prisma.userRating.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                user_id: true,
                poster_id: true,
                numStars: true,
                createdOn: true
            }
        });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fejl 500: kunne ikke hente vurdering fra databasen." });
    }
};

export const updateRecordByMariePierreLessard = async (req: Request, res: Response) => {
    // Logger url parametre: console.log(req.params)
    // Logger form body: console.log(req.body)

    const id = Number(req.params.id);
    const { user_id, poster_id, numStars, createdOn } = req.body; 

    if (!id) {
        return res.status(400).json({ error: "Fejl 400: id skal have en gyldig værdi." });
    };

    if (!user_id || !poster_id || !numStars || !createdOn) {
        return res.status(400).json({ error: "Fejl 400: alle felter skal udfyldes." });
    };

    try {
        const data = await prisma.userRating.update({
            where: { id },
            data: {
                user_id: Number(user_id),
                poster_id: Number(poster_id),
                numStars: Number(poster_id), 
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

    try {
        await prisma.userRating.delete({
            where: { id },
        });

        res.status(200).json({ message: `Vurderingen nr. ${id} er slettet.`, deletedId: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fejl 500: kunne ikke slette vurderingen i databasen." });
    };
};

