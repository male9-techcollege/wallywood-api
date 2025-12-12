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

    const { genre_id, poster_id, createdOn } = req.body;

    if (!genre_id || !poster_id || !createdOn) {
        return res.status(400).json({ error: "Fejl 400: alle felter skal udfyldes." });
    };

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

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Fejl 500: noget gik galt på serveren." });
    };
};

export const getRecordsByMariePierreLessard = async (req: Request, res: Response) => {
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
    } catch (error) {
        console.error(error);
        res.status(500).send(`Fejl 500: kunne ikke hente liste af relationer mellem genrer og plakater fra databasen.`);
    };
};

export const getRecordByMariePierreLessard = async (req: Request, res: Response) => {
    /* NOTE: many of the notes below are from when I had included the id field in the composite key. 
    Later, I excluded the id field from the composite key, but I kept it unique. Therefore, it can be found with findUnique as we usually do. */
    /* Getting a record that has a composite key is different from getting a record with a normal key. 
    Analysis: 
    - The object returned below contains the property "id", 
    which is the word used for the dynamic parameter in the route (:id).
    - The value is the number chosen for the Postman test.
    */
    console.log(req.params); //Returns: [Object: null prototype] { id: '1' }

    /* The following gets the string ("1") out of the object with the parameters (above). */
    const idAsString = req.params.id;
    console.log(idAsString); 

    /* The following turns the string extracted from the URL parameters into a number. */ 
    const id = Number(req.params.id);

    /* Conditional expression, with the most likely case named first */
    if (id) {
        console.log(`The URL for record ${id} was accessed.`); //This is printed successfully.
    } else {
        return res.status(400).json({ error: "Fejl 400: id har ingen værdi." });
    };

    /* Kasper said that deconstruction only works with object, not strings or arrays.
    If I received a string and wanted to turn it into an array, Kasper said I should use .split() 
    ("The split() method of String values takes a pattern and divides this string into an ordered list of substrings by searching for the pattern, puts these substrings into an array, and returns the array." https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split), 
    BUT the compound ID/composite key is an array acc. to the text 
    @@id(name: "compositeId", [id, genre_id, poster_id])
    in schema.prisma. (Based on https://github.com/prisma/prisma/discussions/21755, it's not always described with square brackets in code, though!)
    Indeed, I can refer to id_genre_id_poster_id as compositeId (for instance) acc. to Prisma documentation at 
    https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-composite-ids-and-constraints
    Acc. to error messages in VS Code, id_genre_id_poster_id is an array of strings (i.e. string[]). The strings must be:
    "id: value"
    "genre_id: value"
    "poster_id: value"
    The following does print the text ["id: 1"] in the terminal, 1 being the record ID used in Postman.
    */
    const idIncompleteArray = [`id: ${id}`];
    console.log(idIncompleteArray);

    /* The problem is that I don't necessarily have or know the rest of the elements of the compound key, just the id. 
    With the code below, I was trying to write a function to return an array of which only the 1st string was known,
    but it is not usable on the request. 
    const idArray = (id: Number, ...restOfParams: []) => {
        const compoundId = [`id: ${id}`, ...restOfParams];
        return compoundId;
    };
    console.log(idArray); //First, this prints: [Function: idArray]. Under findUnique, where, and compositeId: idArray(idRequested), it printed [ "id: 1" ], but some error was also generated.
    */
    
    try {
        /* In Prisma documentation, I did not find any example of a compound key searched, with where and findUnique,
        where the compound key was incomplete. See for example https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-composite-ids-and-constraints 
        Acc. to AleClarson: "The only thing findUnique() does differently from findFirst() is that it requires the where clause to match a primary key or unique constraint."
        https://github.com/drizzle-team/drizzle-orm/issues/742
        This matching requirement could be the reason why findFirst works, but not findUnique.
        
        "findFirst()
        findFirst returns the first record in a list that matches your criteria."
        https://www.prisma.io/docs/orm/reference/prisma-client-reference#findfirst 

        The following code worked.

        const data = await prisma.genrePosterRel.findFirst({
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

        In earlier attempts, the property compositeId was indeed found by Prisma
        and given the type GenrePosterRelCompositeIdCompoundUniqueInput.

        The following is based on example found at https://github.com/prisma/prisma/discussions/21755
        but I still generates errors.
        compositeId: {
            id: idRequested,
            genre_id: genres.id,
            poster_id: posters.id
        },
        */
        /* It is easier to find records with the @unique (not @id) id field in the model than to find the compound key! */
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
    };
};

export const updateRecordByMariePierreLessard = async (req: Request, res: Response) => {
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
                genre_id: Number(genre_id),
                poster_id: Number(poster_id),
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

