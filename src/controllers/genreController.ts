/* TO DO: add missing random values to pre-request script in Postman for POST and PUT */
/* KILDER FOR DEN FØLGENDE KODE:
- Everride codealongs og mine tilhørende øvelser (version 6 i TypeScript)
  Note: teacher's code from Everride codealongs can be found at https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong 
- Moodle
- ... */
/* Se tilhørende kommentarer i posterController.ts/.js */
import { Request, Response } from "express";
import { prisma } from "../prisma.js";

export const createRecordByMariePierreLessard = async (req: Request, res: Response) => {
    console.log(req.body);

    const { title, slug, createdOn, updatedOn } = req.body;

    if (!title || !slug || !createdOn || !updatedOn) {
        return res.status(400).json({ error: "Fejl 400: alle felter skal udfyldes." });
    };

    try {
        const data = await prisma.genre.create({
            data: {
                title,
                slug,
                createdOn: new Date(createdOn),
                updatedOn: new Date(updatedOn)
            }
        });

        const dataWithIdByMariePierreLessard = {
            id: data.id,
            title,
            slug,
            createdOn,
            updatedOn
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
        const data = await prisma.genre.findMany({
            select: {
                id: true,
                title: true,
                slug: true,
                createdOn: true,
                updatedOn: true,
                /* Each of the following serves the purpose of showing an array from another table. */
                genrePosterRels: true
            },
            orderBy: {
                title: "asc"
            }
        });
        console.log("The genre controller is returning: ", data);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Fejl 500: kunne ikke hente liste af genrer fra databasen.`);
    };
};

export const getRecordByMariePierreLessard = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    //console.log(id);

    if (!id) {
        return res.status(400).json({ error: "Fejl 400: id har ingen værdi." });
    };

    try {
        const data = await prisma.genre.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
                slug: true,
                createdOn: true,
                updatedOn: true,
                /* Each of the following serves the purpose of showing an array from another table. */
                genrePosterRels: true
            }
        });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fejl 500: kunne ikke hente genre fra databasen." });
    }
};

export const updateRecordByMariePierreLessard = async (req: Request, res: Response) => {
    // Logger url parametre: console.log(req.params)
    // Logger form body: console.log(req.body)

    const id = Number(req.params.id);
    const { title, slug, createdOn, updatedOn } = req.body; 

    if (!id) {
        return res.status(400).json({ error: "Fejl 400: id skal have en gyldig værdi." });
    };

    if (!title || !slug || !createdOn || !updatedOn) {
        return res.status(400).json({ error: "Fejl 400: alle felter skal udfyldes." });
    };

    try {
        const data = await prisma.genre.update({
            where: { id },
            data: {
                title,
                slug,
                createdOn: new Date(createdOn),
                updatedOn: new Date(updatedOn)
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
        await prisma.genre.delete({
            where: { id },
        });

        res.status(200).json({ message: `Genren nr. ${id} er slettet.`, deletedId: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fejl 500: kunne ikke slette genren i databasen." });
    };
};

