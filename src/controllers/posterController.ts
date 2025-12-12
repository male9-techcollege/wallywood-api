/* Maybe TO DO: experiment with include instead of select */
/* TO DO: add missing random values to pre-request script in Postman for POST and PUT */
/* KILDER FOR DEN FØLGENDE KODE:
- Everride codealongs og mine tilhørende øvelser (version 6 i TypeScript)
  Note: teacher's code from Everride codealongs can be found at https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong 
- Moodle
- ... */
import { Request, Response } from "express";
import { prisma } from "../prisma.js";

/* The following code stems from a codealong. It's JavaScript.
Heinz updated the instructions on Moodle (https://moodle.techcollege.dk/course/section.php?id=282545) after giving up on using Prisma 7. 
The instructions are now for TypeScript, which is a superset of JavaScript acc. to various online sources, incl. https://stackoverflow.com/questions/29918324/is-typescript-really-a-superset-of-javascript 
"A superset is a language that includes all of the features of another language, as well as additional features. (...)
TypeScript adds functionality to JavaScript, including:
Early error detection (...)
Code consistency (...)
Scalability (...)
Tooling (...)
Your TypeScript is compiled into JavaScript so that your browser can parse it."
https://www.epicweb.dev/what-is-a-superset-in-programming
*/
/**
 * Method createRecord
 * @param req 
 * @param res 
 * @returns Object
Source of comment: https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong/blob/main/src/controllers/carController.ts
 */
export const createRecordByMariePierreLessard = async (req: Request, res: Response) => {
    // console.log(1234);
    /* The following worked in Everride project:
    console.log(req.body);
    res.send("Du har kaldt modellen med en POST-metode.");
    */
    console.log(req.body);

    /* The id field is excluded from the deconstructing assignment because it is populated automatically by the database according to what Heinz said in the codealong. */
    /* The following works after entering the field names under Body > x-www-form-urlencoded in Postman (otherwise, the properties are said to be undefined since there is no request from an actual form):  */
    const { name, slug, description, image, width, height, price, stock, createdOn, updatedOn } = req.body;

    if (!name || !slug || !description || !image || !width || !height || !price || !stock || !createdOn || !updatedOn) {
        return res.status(400).json({ error: "Fejl 400: alle felter skal udfyldes." });
    };

    try {
        const data = await prisma.poster.create({
            data: {
                /* Adding the field id here hinders the creation of a record in the db and does not help return the id 
                so that it can be used in some other function. 
                id,
                */
                name,
                slug,
                description,
                image,
                /* When testing with Postman, everything coming to the API is a string, so it is necessary to convert to a JS data type. 
                Even though MySQL database uses format YYYY-MM-DD HH:MM:SS for dates, the JS data type doesn't need to be converted to that.
                Heinz thinks Prisma takes care of the conversion.
                */
                width: Number(width),
                height: Number(height),
                price: Number(price),
                stock: Number(stock),
                createdOn: new Date(createdOn),
                /* Normalisation rules (normal forms)
                There are rules in database design acc. to which: 
                - data should not be repeated;
                - no field should be empty. 
                This is to reduce errors (e.g. typos) and keep database size down. 
                For instance, a relation can be created to a table that contains the options in a select menu in a form that populates the database. 
                If some fields are optional, they should be in a table where rows only get created if the field is populated. 
                Exceptions are often made for names (first and last) and addresses, but there can be separate tables for city names, which can be automatically provided when users give their postal code, for instance. 
                Source: mix of teaching in class and terminological research through Google ("normal forms" is the proper translation in EN) 
                
                In order to obey these rules perfectly, I could put the following field in a different table,
                but this violate the instructions of the assignment.

                Maybe TO DO to solve this problem: use PATCH method to only update updatedOn and not createdOn when the record is updated. 
                This would require editing schema.prisma 
                */
                updatedOn: new Date(updatedOn)
            }
        });

        /* Codealong said: 
        return res.status(201).json(data);
        BUT this does not return the id of the newly created record, only the properties of the data object declared above.

        The following doesn't work. Nothing is returned even though a new record is created.
        return res.status(201).json();
        
        Solution:
        "In Prisma when you're creating a record using the create method it returns the newly created data along with all it's fields as a object. So after creating it you can access the newly created records id from there. (...)
        Wakil Ahmed (...)
        const bundleId = bundle.id"
        https://stackoverflow.com/questions/77653608/using-prisma-how-to-get-the-newly-created-records-idpk

        The following does return the id of the newly created record, but not inside of the data object.
        data is the key, and the value only contains the fields in the object above. 
        const dataIdByMariePierreLessard = data.id;
        console.log(dataIdByMariePierreLessard);
        const dataWithIdByMariePierreLessard = {
            dataIdByMariePierreLessard,
            data
        };
        return res.status(201).json(dataWithIdByMariePierreLessard);

        I thought of the following myself instead of data.id as recommended on Stackoverflow. 
        */
        const dataWithIdByMariePierreLessard = {
            id: data.id,
            name,
            slug,
            description,
            image,
            width, 
            height, 
            price, 
            stock,
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

/**
 * Method getRecords
 * @param req 
 * @param res 
 * @returns Array
 Source of comment: https://github.com/Webudvikler-TechCollege/H1WE080125-dsi-codealong/blob/main/src/controllers/carController.ts
 */
export const getRecordsByMariePierreLessard = async (req: Request, res: Response) => {
    try {
        /* "prisma.car.findMany() bruges til at hente alle rækker fra tabellen Car."
        https://moodle.techcollege.dk/course/section.php?id=282542 
        Even though the table name is capitalised in file schema.prisma, the following does not work unless the majuscule is dropped. */
        /* If there is nothing between parentheses in findMany(), the method just returns everything. */
        /* Maybe TO DO: pagination. Source to use: https://www.prisma.io/docs/orm/prisma-client/queries/pagination */
        const data = await prisma.poster.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                image: true,
                width: true,
                height: true,
                price: true,
                stock: true,
                createdOn: true,
                updatedOn: true,
                /* Each of the following serves the purpose of showing an array from another table. */
                cartLines: true,
                userRatings: true,
                genrePosterRels: true
            },
            orderBy: {
                name: "asc"
            }
        });
        console.log("The poster controller is returning: ", data);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Fejl 500: kunne ikke hente liste af plakater fra databasen.`);
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
    //console.log(id);

    if (!id) {
        return res.status(400).json({ error: "Fejl 400: id har ingen værdi." });
    };

    try {
        const data = await prisma.poster.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                image: true,
                width: true,
                height: true,
                price: true,
                stock: true,
                createdOn: true,
                updatedOn: true,
                /* Each of the following serves the purpose of showing an array from another table. */
                cartLines: true,
                userRatings: true,
                genrePosterRels: true
            }
        });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fejl 500: kunne ikke hente plakaten fra databasen." });
    }
};

export const updateRecordByMariePierreLessard = async (req: Request, res: Response) => {
    // Logger url parametre: console.log(req.params)
    // Logger form body: console.log(req.body)

    //req.params.id gets data out of the URL
    //Heinz also mentioned the req.query property, which is used when there is a query (with a question mark) in the URL
    const id = Number(req.params.id);
    //req.body gets data out of the body (only works with HTTP-request methods that have a header+body structure)
    const { name, slug, description, image, width, height, price, stock, createdOn, updatedOn } = req.body; // Deconstruerer form body objektet

    if (!id) {
        return res.status(400).json({ error: "Fejl 400: id skal have en gyldig værdi." });
    };

    if (!name || !slug || !description || !image || !width || !height || !price || !stock || !createdOn || !updatedOn) {
        return res.status(400).json({ error: "Fejl 400: alle felter skal udfyldes." });
    };

    try {
        const data = await prisma.poster.update({
            where: { id },
            data: {
                name,
                slug,
                description,
                image,
                width: Number(width),
                height: Number(height),
                price: Number(price),
                stock: Number(stock),
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

    if (!id) {
        return res.status(400).json({ error: "Fejl 400: id har ingen værdi." });
    };

    try {
        /* Moodle instructions said the following, and it was sufficient to make it work.
        Everride codealong added const data = in front of await. 
        await prisma.car.delete({
            where: { id },
        });

        res.status(200).json({ message: `Bil nr. ${id} er slettet` });
        */
        await prisma.poster.delete({
            where: { id },
        });

        res.status(200).json({ message: `Plakaten nr. ${id} er slettet.`, deletedId: id });
        /* Maybe TO DO: solve security issues:
        It is highly advisable to ask the user for a confirmation before deleting anything,
        but this API is basic.

        In many situations, deletions should only be performed by authorised user(s), 
        so an authentification step is also missing here.
        */
 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fejl 500: kunne ikke slette plakaten i databasen." });
    };
};

