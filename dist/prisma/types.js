/* KILDER FOR DEN FØLGENDE KODE:
- Everride codealongs og mine tilhørende øvelser (version 6 i TypeScript)
- Moodle
- ... */
/* The purpose of this file is to give the right type to the values in the CSV files when using TypeScript.
"Som udgangspunkt er værdierne som kommer fra CSV filerne tekststrenge."
https://moodle.techcollege.dk/course/section.php?id=285238

This file needs to be updated every time the models are updated.
*/
export const fieldTypes = {
    //Model 1  
    user: {
        id: "number",
        firstname: "string",
        lastname: "string",
        email: "string",
        password: "string",
        role: "string",
        isActive: "boolean",
        createdOn: "date"
    },
    //Model 2  
    poster: {
        id: "number",
        name: "string",
        slug: "string",
        description: "string",
        image: "string",
        width: "number",
        height: "number",
        price: "number",
        stock: "number",
        createdOn: "date",
        updatedOn: "date"
    },
    //Model 3  
    genre: {
        id: "number",
        title: "string",
        slug: "string",
        createdOn: "date",
        updatedOn: "date"
    },
    //Model 4 
    cartLine: {
        id: "number",
        user_id: "number",
        poster_id: "number",
        quantity: "number",
        createdOn: "date"
    },
    //Model 5  
    userRating: {
        id: "number",
        user_id: "number",
        poster_id: "number",
        numStars: "number",
        createdOn: "date",
    },
    //Model 6
    genrePosterRel: {
        id: "number",
        genre_id: "number",
        poster_id: "number",
        createdOn: "date"
    }
};
