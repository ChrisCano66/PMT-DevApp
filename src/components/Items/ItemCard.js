import React, { useState, useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import StoreApi from '../../utils/StoreApi';
import { Typography, InputBase } from '@material-ui/core';


function ItemCard({ item, listId, index }) {

    // on récupère la fonction updateListContent qui est passée dans l'application 
    // via le le context StoreAPI.Provider qui englobe l'application
    const {updateItemContent} = useContext(StoreApi);

    // constante d'état permette de savoir si on édite ou non le titre de la liste
    const [openItem, setOpenItem] = useState(false);

    // constante d'état du titre et du nouveau titre (si modif) de la liste 
    // (par défaut c'est le titre enregistré dans le store)
    const [newContent, setNewContent] = useState(item.content);

    // Fonction qui gère le changement de titre de la liste
    const handleOnChange = (event) => {
        setNewContent(event.target.value);
    };

    // Fonction qui gère la validation du changement de titre de la liste
    const handleOnBlur = () => {
        updateItemContent(newContent, listId, item.id);
        setOpenItem(false);
    };


    return (
        <div className="item-card">

            {/** item draggable pour le DnD */}
            <Draggable draggableId={item.id} index={index}>
                {(provided) => (<div 
                    // le DnD a besoin d'une ref spécial fourni par lui même afin de connaître les zones de référence
                    // ainsi que de faire appelle au props propre à lui-même
                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="container item"
                >

                    {/** on vérifie l'état de l'ouverture de l'édition du titre de la liste
                     * s'il est ouvert on met l'inputText 
                     * sinon, on affiche simplement le titre */}
                    {openItem ? (
                        // ce qui s'affiche lorsque l'on veut éditer
                        <div className="item-input">
                            <InputBase 
                                onChange={handleOnChange}
                                value={newContent} 
                                autoFocus
                                fullWidth 
                                inputProps ={{
                                    className:"item-content-input"
                                }}
                                onBlur={handleOnBlur}
                            />                    
                        </div>
                    ) : (
                        // ce qui s'affiche en temps normal (juste le titre)
                        <div className="item-content">
                            <Typography 
                                onClick={() => setOpenItem(!openItem)}  
                                className="item-content-standing"
                            >
                                {/** on affiche le contenu de l'item */}
                                {item.content}
                            </Typography>
                        </div>
                    )}
                    
                </div>)} 
            </Draggable>
        </div>
    )
}

export default ItemCard;
