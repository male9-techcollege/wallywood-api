import { prisma } from "../prisma.js";
export const createRecordByMariePierreLessard = async (req, res) => {
    console.log(req.body);
    const { genre_id, poster_id, createdOn } = req.body;
    if (!genre_id || !poster_id || !createdOn) {
        return res.status(400).json({ error: "Fejl 400: alle felter skal udfyldes." });
    }
    ;
    try {
        const data = await prisma.genrePosterRel.create({
            data: {
                genre_id: Number(genre_id),
                poster_id: Number(poster_id),
                createdOn: new Date(createdOn)
            }
        });
        const dataWithIdByMariePierreLessard = {
            id: data.id,
            genre_id,
            poster_id,
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
        const data = await prisma.genrePosterRel.findMany({
            select: {
                id: true,
                genre_id: true,
                poster_id: true,
                createdOn: true
            },
            orderBy: {
                genre_id: "asc"
            }
        });
        console.log("The genre-poster-relation controller is returning: ", data);
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(`Fejl 500: kunne ikke hente liste af relationer mellem genrer og plakater fra databasen.`);
    }
    ;
};
export const getRecordByMariePierreLessard = async (req, res) => {
    /* Acc. to advice from Kasper, once I deconstruct the compound ID, which requires it to be an object, not a string or an array,
    I should be able to fish out the property id from the deconstructed object and use it to get/update/delete single records. */
    let tryFishingOutCompoundIdfromParams1 = req.params.id_genre_id_poster_id; //NOT type array of strings (i.e. string[]) yet, just a string because it is fished out of the URL
    console.log(tryFishingOutCompoundIdfromParams1);
    let tryFishingOutCompoundIdfromParams2 = req.params.compositeId; //NOT type array of strings (i.e. string[]) yet, just a string because it is fished out of the URL
    console.log(tryFishingOutCompoundIdfromParams2);
    //THe following deconstructing assignment should work, but I don't know what the delimiter is (comma, space)?
    //let { id, genre_id, poster_id } = tryFishingOutCompoundIdfromParams.split(",");
    //console.log({ id, genre_id, poster_id })
    //const idArray = [id, genre_id, poster_id];
    //console.log(id);
    /*     if (!tryFishingOutCompoundIdfromParams) {
            return res.status(400).json({ error: "Fejl 400: id har ingen værdi." });
        };
     */
    /* TO DO: Does one solve this problem by using a filter as desc. at https://www.prisma.io/docs/orm/prisma-client/queries/crud
    Ah, more likely source: https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-composite-ids-and-constraints */
    /*     try {
            const data = await prisma.genrePosterRel.findUnique({
                where: {
                    id
                },
                select: {
                    id: true,
                    genre_id: true,
                    poster_id: true,
                    createdOn: true
                }
            });
            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Fejl 500: kunne ikke hente genre-plakat relationen fra databasen." });
        }
     */
};
/* export const updateRecordByMariePierreLessard = async (req: Request, res: Response) => {
    // Logger url parametre: console.log(req.params)
    // Logger form body: console.log(req.body)

    const id = Number(req.params.id);
    const { genre_id, poster_id, createdOn } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Fejl 400: id skal have en gyldig værdi." });
    };

    if (!genre_id || !poster_id || !createdOn) {
        return res.status(400).json({ error: "Fejl 400: alle felter skal udfyldes." });
    };

    try {
        const data = await prisma.genrePosterRel.update({
            where: { id },
            data: {
                genre_id,
                poster_id,
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
        await prisma.genrePosterRel.delete({
            where: { id },
        });

        res.status(200).json({ message: `Genre-plakat relationen nr. ${id} er slettet.`, deletedId: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fejl 500: kunne ikke slette genre-plakat relationen i databasen." });
    };
};
 */
