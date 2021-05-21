// Ensembles des données de l'application 

// ITEMS 
// constante qui stocke les différents items
const items = [
    {
        id: 'card-1',
        content: 'Learning',
    },
    {
        id: 'card-2',
        content: 'Learning more',
    },
    {
        id: 'card-3',
        content: 'Learning even more',
    },
];


// LISTES 
// constantes qui stocke l'ensemble des données d'une liste
const data = {
    lists: {
        'list-1': {
            id: 'list-1',
            content: 'Todo 1',
            items,
        },
    },
    listIds: ['list-1'],
};

export default data;
