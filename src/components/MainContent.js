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
        
        // on rajoute la nouvelle id de l'item à la liste des ids d'item
        list.itemIds = [...list.itemIds, newItemId];

        // on rajoute le nouvel item dans la liste en question (en reprenant les items déjà présent)
        list.items = {
            ...list.items, 
            [newItemId] : newItem,
        };

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
        
        // création d'une id pour la nouvelle liste en utilisant la méthode 
        // "uuid" afin d'avoir une id unique
        const newListId = uuid();

        // création de la nouvelle liste
        const newList = {
            id: newListId,
            content,
            items: {},
            itemIds: [],
        };

        // on update le state au niveau des datas avec les nouvelles datas
        const newState = {
            // on rajoute la nouvelle listId dans la liste dans listIds
             listIds: [...data.listIds, newListId],
             // on rajoute les données de la liste dans la liste des listes 
             lists: {
                 // on récupère les listes dajà existantes
                 ...data.lists,
                 // on rajoute la nouvelle liste au niveau de sa nouvelle id
                 [newListId]:newList,
             },
        };
        
        // on applique les nouvelles datas (newState) à la constante d'état des datas 
        setData(newState);
    };

    // fonction qui édite le contenu d'une liste
    const updateListContent = (content, listId) => {

        // on récupère la liste qui nous intéresse grâce à l'id
        const list = data.lists[listId];

        // on modifie le contenu du titre de la liste 
        list.content = content;

        // on update le state au niveau des datas avec les nouvelles datas
        const newState = {
            // on récupère l'ensemble des datas 
            ...data,
            // on modifie les données de la liste sélectionnée dans la liste des listes
            lists: {
                // on récupère les listes dajà existantes
                ...data.lists,
                // on rajoute la nouvelle liste au niveau de sa nouvelle id
                [listId]: list,
            },
        };
        // on applique les nouvelles datas (newState) à la constante d'état des datas 
        setData(newState);
    };

    // fonction qui édite le contenu d'une liste
    const updateItemContent = (content, listId, ItemId) => {
        console.log(content);

        // on récupère la liste qui nous intéresse grâce à l'id
        const list = data.lists[listId];

        // on récupère l'item' qui nous intéresse grâce à son id
        const item = list.items[ItemId];

        // on modifie le contenu de l'item sélectionné 
        item.content = content;

        // on update le state au niveau des datas avec les nouvelles datas
        const newState = {
            // on récupère l'ensemble des datas 
            ...data,
            // on modifie les données de la liste sélectionnée dans la liste des listes
            lists: {
                // on récupère les listes dajà existantes
                ...data.lists,
                // on rajoute la nouvelle liste au niveau de sa nouvelle id
                [listId]: list,
            },
        };
        // on applique les nouvelles datas (newState) à la constante d'état des datas 
        setData(newState); 
    };

    return (
        // Provider permettant de gérer les datas présentes dans les différents items de chaque liste
        <StoreApi.Provider value={{ addMoreItem, addMoreList, updateListContent, updateItemContent }}>
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
