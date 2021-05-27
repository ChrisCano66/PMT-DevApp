//////////////////  TABLE lists  //////////////////////////

// création d'un fonction qui va crée le model pour la table Lists
// et ensuite permettre d'exporter les variables hors du fichier pour qu'il soit utilisable (méthode "module.exports")
module.exports = (sequelize, DataTypes) => {

    // variable qui représente notre modele pour la bdd
    const Lists = sequelize.define("lists", {
        content_list: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Lists;
};
