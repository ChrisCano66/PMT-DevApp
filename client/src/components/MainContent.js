import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {v4 as uuid} from 'uuid';
import ListCard from './List/ListCard';
import Store from '../utils/Store';
import StoreApi from '../utils/StoreApi';
import InputContainer from './Inputs/InputContainer';
import Axios from 'axios';


function MainContent() {

    // constante d'état qui récupère les datas pour l'application
    const [data, setData] = useState(Store);
    const [dataDB, setDataDB] = useState([]);

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

        // TEST BDD AXIOS
        Axios.post("http://localhost:3001/api/insertlist", {
            content_list: content,
        }).then(() => {
            console.log("successful list insert");
        }); 


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

    // fonction permettant de gérer le DnD
    const onDragEnd = (result) => {
        // props nécessaire pour le fonctionnement (donnant la source, la destinnation et l'id de l'item qui est DnD)
        const {destination, source, draggableId, type} = result;

        // si la destination est null on renvoie rien et on stop là
        if (!destination) {
            return;
        }

        // si le type de l'objet DnD est une liste 
        if (type === "list") {
            // on recupère la liste des "listsIds"
            const newListIds = data.listIds;
            // on switch les ids de la source et de la destiv=nation grâce à un "splice"
            newListIds.splice(source.index, 1);
            newListIds.splice(destination.index, 0, draggableId);
            return;
        }

        // on récupère (sous forme d'array) la liste des sources et la liste des destinations pour les listes, les items et les itemIds
        const sourceList = source.droppableId;
        const destinationList = destination.droppableId;
        const sourceListItemIds = data.lists[source.droppableId].itemIds;
        const destinationListItemIds = data.lists[destination.droppableId].itemIds;
        const sourceListItems = data.lists[source.droppableId].items;
        const destinationListItems = data.lists[destination.droppableId].items;

        // récupération du content de l'item qui est DnD
        const content = data.lists[source.droppableId].items[draggableId].content;

        // "création" de l'item qui est DnD pour le passer à la liste des items de la liste de destination 
        const idAndContentItem = {
            id: draggableId,
            content,
        };

        // si la source et la destination sont identiques
        if (source.droppableId === destination.droppableId) {
            // on enlève l'emplacment à la source au niveau des itemIds
            sourceListItemIds.splice(source.index, 1);
            // on ajoute l'emplacement à la destination au niveau des itemIds
            destinationListItemIds.splice(destination.index, 0, draggableId);
            
            // on actualise le State
            const newState = {
                ...data,
                lists : {
                    ...data.lists,
                    [sourceListItemIds] : destinationListItemIds,
                }
            };
            setData(newState);
        } 
        else {
            // on enlève l'item au niveau de la source au niveau des items et des itemIds
            sourceListItemIds.splice(source.index, 1);
            delete sourceListItems[draggableId];
            // on ajoute l'item au niveau de la destination au niveau des items et des itemIds
            destinationListItemIds.splice(destination.index, 0, draggableId); 
            destinationListItems[draggableId] = idAndContentItem;
            
            // on actualise le State
            const newState = {
                ...data,
                lists : {
                    ...data.lists,
                    [sourceList] : {
                        ...data.lists[sourceList],
                        items : sourceListItems,
                        itemIds : sourceListItemIds,
                    },
                    [destinationList] : {
                        ...data.lists[destinationList],
                        items : destinationListItems,
                        itemIds : destinationListItemIds,
                    }
                }
            };
            setData(newState);
        }
    }

    return (
        // Provider permettant de gérer les datas présentes dans les différents items de chaque liste
        <StoreApi.Provider value={{ addMoreItem, addMoreList, updateListContent, updateItemContent }}>
            <div className="main">
            <DragDropContext onDragEnd={onDragEnd}>

                {/** zone de liste droppable */}
                <Droppable droppableId="app" type="list" direction="horizontal">
                {(provided) => (
                    // partie principale de l'application (contient, dynamiquement, l'ensemble des listes) */}
                    <div 
                        className="main-content" 
                        ref={provided.innerRef} 
                        {...provided.droppableProps}
                    >
                        {/** on boucle sur l'ensemble des listIds dans le Store 
                         * et on rend la liste
                         */}
                        { data.listIds.map((listId, index) => {
                            // constante qui récupère l'ensemble des données de la liste ciblé par le mappage 
                            const list = data.lists[listId];
                            // on return la Liste
                            return (
                                // on passe les infos de la liste sélectionnée à la liste pour afficher les items
                                // plus une key pour le mappage et les infos de la liste pour leurs réutilisation par les items
                                <ListCard list={list} key={listId} index={index}/>
                            )
                        })} 
                        {/** placeholder pour mettre les espaces libres entre les listes pour le DnD */}
                        {provided.placeholder}
                    </div> 
                )}
                </Droppable>

                {/** partie qui permet de créer un nouvel item */}
                <InputContainer className="input-container-list" type="list"/> 

            </DragDropContext> 
            </div>           
        </StoreApi.Provider>        
    );
};

export default MainContent;
