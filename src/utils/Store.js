// Ensembles des données de l'application 

// LISTES 
// constantes qui stocke l'ensemble des données
const data = {
    lists: {
        'list-1': {
            id: 'list-1',
            content: 'Todo 1',
            items : {
                'item1': {
                    id: 'item1',
                    content: 'Learning',
                },
                'item2': {
                    id: 'item2',
                    content: 'Learning more',
                },
                'item3': {
                    id: 'item3',
                    content: 'Learning more more',
                },
            },
            itemIds: ['item1', 'item2', 'item3']
        },
        'list-2': {
            id: 'list-2',
            content: 'Todo 2',
            items : {
                'item4': {
                    id: 'item4',
                    content: 'Learning',
                },
            },
            itemIds: ['item4']
        },
    },
    listIds: ['list-1', 'list-2'],
};

export default data;
