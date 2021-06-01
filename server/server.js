// on créer la "dépendance" avec express
const express = require('express');
// on créer la "dépendance" avec cors
const cors = require('cors');

// creation d'une instance d'express afin de l'utiliser plus simplement
const app = express();
// permet de pouvoir récupérer des données sous format json et les "traduire" en données pour sql
app.use(express.json());
// Cross-origin resource sharing is a mechanism that prevents you from accessing website resources from a different domain or subdomain
app.use(cors());

// on créer la "dépendance" avec mysql et sequelize
const db = require("./models");


// Routers
// on importe les routers pour les lists et les items afin qu'ils soient utilisable côté server
const listRouter = require('./routes/Lists');
const itemRouter = require('./routes/Items');
app.use('/lists', listRouter);
app.use('/items', itemRouter);


// on synchronise les données avec sequelize pour le passer au serveur afin de ne pas modifier la BDD si ce n'est pas nécessaire
db.sequelize.sync().then(() => {
    // lancement de la l'app sous le port:3001
    app.listen(3001, () => {
        console.log("Server running on port:3001.") 
    });
})
