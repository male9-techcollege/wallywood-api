# wallywood-api

Opgavens afleveringsadresse på GitHub er [https://github.com/male9-techcollege/wallywood-api](https://github.com/male9-techcollege/wallywood-api).

Den tilhørende Postman-kollektion er udgivet på adressen [https://documenter.getpostman.com/view/49431030/2sB3dSQ99V](https://documenter.getpostman.com/view/49431030/2sB3dSQ99V).

En del af opgavens krav (relationerne mellem tabellerne) ligger på [https://drawsql.app/teams/webudvikler-team-techcollege/diagrams/wallywood](https://drawsql.app/teams/webudvikler-team-techcollege/diagrams/wallywood).

## Vejledning til installation og opstart af API'et 

For at bruge API'et:
* Lav en klone af API'et på din computer.
* Installer Node.js, hvis denne "runtime environment" ikke er på computeren endnu.
* Installer afhængighederne ved at indtaste den følgende kommando i terminalen, fra roden af API'et: npm i
* Udfyld .env-filen for at være i stand til at seede din database med kommandoerne i package.json.
* Byg din frontend-løsning og brug API'et ved at kalde de følgende ruter fra din frontend. Disse "base routes" bruges til at hente flere rækker og danne nye rækker.
> * <localhost:port>/api/users
> * <localhost:port>/api/login
> * <localhost:port>/api/auth
> * <localhost:port>/api/posters
> * <localhost:port>/api/genres
> * <localhost:port>/api/gprel
> * <localhost:port>/api/cart
> * <localhost:port>/api/ratings
* Tilføj ID'et på rækker i databasens tabeller efter disse "base routes" for at hente, opdatere og slette enkelte rækker, f.eks.: <localhost>/api/users/1

Copyright 2025, Marie-Pierre Lessard