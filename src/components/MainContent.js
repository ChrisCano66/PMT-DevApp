import React, { useState } from 'react';
import ListCard from './List/ListCard';
import Store from '../utils/Store';

function MainContent() {

    // constante d'état qui récupère les datas pour l'application
    const [data, setData] = useState(Store);

    return (
        // partie principale de l'application (contient, dynamiquement, l'ensemble des listes)
        <div className="main-content">
            {/** on boucle sur l'ensemble des listIds dans le Store 
             * et on rend la liste
             */}
            { data.listIds.map((listId) => {
                // constante qui récupère l'ensemble des données de la liste ciblé par le mappage 
                const list = data.lists[listId];

                // on return la Liste
                return (
                    // on passe les infos de la liste sélectionnée à la liste pour afficher les items
                    // plus une key pour le mappage
                    <ListCard list={list} key={listId}/>
                )
            })}         
        </div>
    )
};

export default MainContent;
