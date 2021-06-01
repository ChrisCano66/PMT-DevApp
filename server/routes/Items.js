//////////// Routes liées aux requetes sql pour les Items ////////////

// on créer la "dépendance" avec express
const express = require('express');

// systeme de routing d'Express
const router = express.Router();

// on crée la dépendance du Model Items
const models = require('../models');


// route pour un get 
// req = request / res = response
router.get("/", async (req, res) => {
    
    // on récupère toutes les données dans la table lists 
    const listOfItems = await models.items.findAll();

    // juste pour voir si cela fonctionne correctement
    res.json("get passage");
});

// route pour l'insert d'un nouvel item :
// async pour des données asynchrones grâce à Sequelize
router.post("/insertitem", async (req, res) => {

    // on récupère les données envoyé par le submit 
    const content_item = req.body;

    // creation de la nouvelle entrée dans la bdd grâce à Sequelize et au model Items déjà créé
    // "await" pour s'assurer que la requete est bien passée avec de continuer le code
    await models.items.create(content_item);

    // juste pour voir si cela fonctionne correctement
    res.json(content_item);
});


// on export "router" afin de pouvoir l'utiliser dans l'application
module.exports = router;