import React, { useState } from 'react';
import {v4 as uuid} from 'uuid';
import ListCard from './List/ListCard';
import Store from '../utils/Store';
import StoreApi from '../utils/StoreApi';
import InputContainer from './Inputs/InputContainer';

function MainContent() {

    // constante d'état qui récupère les datas pour l'application
    const [data, setData] = useState(Store);

    // fonction qui récupère le contenu pour créer un nouvel item
    const addMoreItem = (content, listId) => {
        
        // création d'une id pour le nouvel Item en utilisant la méthode 
        // "uuid" afin d'avoir une id unique
        const newItemId = uuid();

        // création du nouvel item
        const newItem = {
            id: newItemId,
            content,
        };

        // on récupère la bonne liste dans les datas qui correspond à l'item que l'on veut rajouter
        const list = data.lists[listId];
        // et on rajoute le nouvel item dans la liste en question (en reprenant les items déjà présent)
        list.items = [...list.items, newItem];

        // on update le state au niveau des datas avec les nouvelles datas
        const newState = {
            // on récupère les datas déjà présentes
             ...data,
             // on modifie les listes 
             lists: {
                 // on récupère la liste des listes dajà existantes
                 ...data.lists,
                 // on update la liste en question grâce à son id avec la list que l'on a crée plus avant
                 [listId]:list
             },
        };
        // on applique les nouvelles datas (newState) à la constante d'état des datas 
        setData(newState);
    };

    // fonction qui récupère le contenu pour créer une nouvelle liste
    const addMoreList = (content) => {
        console.log(content);
        
        // création d'une id pour la nouvelle liste en utilisant la méthode 
        // "uuid" afin d'avoir une id unique
        const newListId = uuid();

        // création de la nouvelle liste
        const newList = {
            id: newListId,
            content,
            items: [],
        };
        console.log(newList);

        // on update le state au niveau des datas avec les nouvelles datas
        const newState = {
            // on rajoute la nouvelle listId dans la liste dans listIds
             listIds: [...data.listIds, newListId],
             // on rajoute les donées de la liste dans la lliste des listes 
             lists: {
                 // on récupère les listes dajà existantes
                 ...data.lists,
                 // on rajoute la nouvelle liste au niveau de sa nouvelle id
                 [newListId]:newList,
             },
        };
        console.log(newState);
        // on applique les nouvelles datas (newState) à la constante d'état des datas 
        setData(newState);
    };

    return (
        // Provider permettant de gérer les datas présentes dans les différents items de chaque liste
        <StoreApi.Provider value={{ addMoreItem, addMoreList }}>
            {/** partie principale de l'application (contient, dynamiquement, l'ensemble des listes) */}
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
                        // plus une key pour le mappage et les infos de la liste pour leurs réutilisation par les items
                        <ListCard list={list} key={listId}/>
                    )
                })}
                <InputContainer type="list"/>       
            </div>
        </StoreApi.Provider>        
    );
};

export default MainContent;
