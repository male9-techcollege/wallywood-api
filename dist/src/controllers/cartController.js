import { prisma } from "../prisma.js";
export const createRecordByMariePierreLessard = async (req, res) => {
    console.log(req.body);
    const { user_id, poster_id, quantity, createdOn } = req.body;
    if (!user_id || !poster_id || !quantity || !createdOn) {
        return res.status(400).json({ error: "Fejl 400: alle felter skal udfyldes." });
    }
    ;
    try {
        const data = await prisma.cartLine.create({
            data: {
                user_id: Number(user_id),
                poster_id: Number(poster_id),
                quantity: Number(quantity),
                createdOn: new Date(createdOn)
            }
        });
        const dataWithIdByMariePierreLessard = {
            id: data.id,
            user_id,
            poster_id,
            quantity,
            createdOn
        };
        console.log(dataWithIdByMariePierreLessard); //It worked in the Everride project.
        return res.status(201).json(dataWithIdByMariePierreLessard);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Fejl 500: noget gik galt på serveren." });
    }
    ;
};
export const getRecordsByMariePierreLessard = async (req, res) => {
    try {
        const data = await prisma.cartLine.findMany({
            select: {
                id: true,
                user_id: true,
                poster_id: true,
                quantity: true,
                createdOn: true
            },
            orderBy: {
                poster_id: "asc"
            }
        });
        console.log("The cart controller is returning: ", data);
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(`Fejl 500: kunne ikke hente liste af kurvens varer fra databasen.`);
    }
    ;
};
export const getRecordByMariePierreLessard = async (req, res) => {
    const id = Number(req.params.id);
    //console.log(id);
    if (!id) {
        return res.status(400).json({ error: "Fejl 400: id har ingen værdi." });
    }
    ;
    try {
        /* It is easier to find records with the @unique (not @id) id field in the model than to find the compound key! */
        const data = await prisma.cartLine.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                user_id: true,
                poster_id: true,
                quantity: true,
                createdOn: true
            }
        });
        return res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fejl 500: kunne ikke hente varen lagt i kurven fra databasen." });
    }
};
export const updateRecordByMariePierreLessard = async (req, res) => {
    // Logger url parametre: console.log(req.params)
    // Logger form body: console.log(req.body)
    const id = Number(req.params.id);
    const { user_id, poster_id, quantity, createdOn } = req.body;
    if (!id) {
        return res.status(400).json({ error: "Fejl 400: id skal have en gyldig værdi." });
    }
    ;
    if (!user_id || !poster_id || !quantity || !createdOn) {
        return res.status(400).json({ error: "Fejl 400: alle felter skal udfyldes." });
    }
    ;
    try {
        const data = await prisma.cartLine.update({
            where: { id },
            data: {
                user_id: Number(user_id),
                poster_id: Number(poster_id),
                quantity: Number(quantity),
                createdOn: new Date(createdOn)
            }
        });
        return res.status(201).json(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Fejl 500: noget gik galt i serveren." });
    }
    ;
};
export const deleteRecordByMariePierreLessard = async (req, res) => {
    const id = Number(req.params.id);
    try {
        await prisma.cartLine.delete({
            where: { id },
        });
        res.status(200).json({ message: `Vare i kurv nr. ${id} er slettet.`, deletedId: id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fejl 500: kunne ikke slette kurvens vare i databasen." });
    }
    ;
};
