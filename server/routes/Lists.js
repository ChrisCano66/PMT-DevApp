//////////// Routes liées aux requetes sql pour les Lists ////////////

// on créer la "dépendance" avec express
const express = require('express');

// systeme de routing d'Express
const router = express.Router();

// on crée la dépendance du Model Lists
const models = require('../models');


// route pour un get 
// req = request / res = response
router.get("/", async (req, res) => {

    // on récupère toutes les données dans la table lists 
    const listOfLists = await models.lists.findAll();

    // juste pour voir si cela fonctionne correctement
    res.json("get passage lists");
});

// route pour l'insert d'une nouvelle liste :
// async pour des données asynchrones grâce à Sequelize
router.post("/", async (req, res) => {

    // on récupère les données envoyé par le submit 
    const content_list = req.body;

    // creation de la nouvelle entrée dans la bdd grâce à Sequelize et au model Lists déjà créé
    // "await" pour s'assurer que la requete est bien passée avec de continuer le code
    await models.lists.create(content_list);

    // juste pour voir si cela fonctionne correctement
    res.json(content_list);
});


// on export "router" afin de pouvoir l'utiliser dans l'application
module.exports = router;