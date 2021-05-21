import React, { useState, useContext }  from 'react';
import { IconButton, InputBase, Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import StoreApi from '../../utils/StoreApi';

function InputCard({setOpenInputCard, listId, type}) {

    // on récupère la fonction addMoreItem et la fonction addMoreList qui sont passées
    // dans l'application via le le context StoreAPI.Provider qui englobe l'application
    const {addMoreItem, addMoreList} = useContext(StoreApi);

    // constante d'état pour le onChange
    const [content, setContent] = useState('');

    // fonction HandleOnChange selon l'event
    const handleOnChange = (event) => {
        setContent(event.target.value);
    };

    // fonction qui gère l'action au niveau du Bouton de confirmation 
    // de l'ajout d'un item dans une liste
    const handleBtnConfirm = () => {
        if (type === "list") {
            addMoreList(content);
            setContent('');
            setOpenInputCard(false);
        } else {
            addMoreItem(content, listId);
            setContent('');
            setOpenInputCard(false);
        };        
    };
    
    // Zone d'ajout/édition d'un nouvel item dans une liste
    return (
        <div className="input-card">
            <InputBase 
                // pour permettre que le nouveau contenu soit pris en compte dans les datas
                onChange={handleOnChange}
                value={content}
                multiline
                fullWidth 
                inputProps ={{
                    className:"add-item-input"
                }}
                placeholder={ type === 'list' ? "Titre de la Liste..." : "Contenu de l'item..." }
                onBlur={() => setOpenInputCard(false)}
            /> 
            <Button 
                className="add-item-btnConfirm"
                // on ferme la zone d'édition quand on clique sur le bouton " Ajouter "
                onClick={handleBtnConfirm}
            >
                { type === 'list' ? "Ajouter la Liste..." : "Ajouter l'Item" }
            </Button>
            <IconButton 
                // on ferme la zone d'édition quand on clique sur le bouton " X "
                onClick={() => setOpenInputCard(false)}
            >
                <ClearIcon/>
            </IconButton>
        </div>
    )
}

export default InputCard;
