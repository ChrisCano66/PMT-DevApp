const express = require('express');

// creation d'une instance d'express afin de l'utiliser plus simplement
const app = express();

// configuration de Nodemon

// quand on essaye d'atteindre l'URL "/" :
// (req = require  /// res = response)
app.get("/", (req, res) => {
    res.send("hello world")
});

// lancement de la l'app sous le port:3001
app.listen(3001, () => {
   console.log("Server running on port:3001.") 
});