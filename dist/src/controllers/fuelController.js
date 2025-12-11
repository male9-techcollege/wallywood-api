import { prisma } from "../prisma.js";
export const createRecordByMariePierreLessard = async (req, res) => {
    console.log(req.body);
    const { name, createdOn, updatedOn } = req.body;
    if (!name || !createdOn || !updatedOn) {
        return res.status(400).json({ error: "Fejl 400: feltet skal udfyldes." });
    }
    ;
    try {
        const data = await prisma.fuelType.create({
            data: {
                name,
                createdOn: new Date(createdOn),
                updatedOn: new Date(updatedOn)
            }
        });
        const dataWithIdByMariePierreLessard = {
            id: data.id,
            name,
            createdOn,
            updatedOn
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
        const data = await prisma.fuelType.findMany({
            select: {
                id: true,
                name: true,
                /* The following does show an array.
                This is a different way of doing it than in carController because brand and category contain more than 1 car, while each car has only 1 brand and 1 category. */
                carFuelRels: true
                /* I left out createdOn and updatedOn. */
            },
            orderBy: {
                name: "asc"
            }
        });
        console.log("The fuel-type controller is returning: ", data);
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(`Fejl 500: kunne ikke hente liste af drivmidler fra databasen.`);
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
        const data = await prisma.fuelType.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                /* The following does show an array. */
                carFuelRels: true
                /* I left out createdOn and updatedOn. */
            }
        });
        return res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fejl 500: kunne ikke hente drivmiddel fra databasen." });
    }
};
export const updateRecordByMariePierreLessard = async (req, res) => {
    // Logger url parametre: console.log(req.params)
    // Logger form body: console.log(req.body)
    const id = Number(req.params.id);
    const { name, createdOn, updatedOn } = req.body;
    if (!id) {
        return res.status(400).json({ error: "Fejl 400: id skal have en gyldig værdi." });
    }
    ;
    if (!name || !createdOn || !updatedOn) {
        return res.status(400).json({ error: "Fejl 400: alle felter skal udfyldes." });
    }
    ;
    try {
        const data = await prisma.fuelType.update({
            where: { id },
            data: {
                name,
                createdOn: new Date(createdOn),
                updatedOn: new Date(updatedOn)
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
        await prisma.fuelType.delete({
            where: { id },
        });
        res.status(200).json({ message: `Drivmiddel nr. ${id} er slettet.`, deletedId: id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fejl 500: kunne ikke slette drivmidlet i databasen." });
    }
    ;
};
