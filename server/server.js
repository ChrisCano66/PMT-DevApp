// on créer la "dépendance" avec express
const express = require('express');

// on créer la "dépendance" avec cors
// const cors = require('cors');

// creation d'une instance d'express afin de l'utiliser plus simplement
const app = express();

// on créer la "dépendance" avec mysql et sequelize
const db = require("./models");


    // la requete sql que l'on veut effectuée :
    //const request = "SELECT * FROM lists;"


    // la requete sql que l'on veut effectuée :
    //const insertRequest = "INSERT INTO lists (content_list) VALUES (?);"



// on synchronise les données avec sequelize pour le passer au serveur afin de ne pas modifier la BDD si ce n'est pas nécessaire
db.sequelize.sync().then(() => {
    // lancement de la l'app sous le port:3001
    app.listen(3001, () => {
        console.log("Server running on port:3001.") 
    });
})
