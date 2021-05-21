import React, { useState, useContext }  from 'react';
import { IconButton, InputBase, Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import StoreApi from '../../utils/StoreApi';

function InputCard({setOpenInputCard, listId}) {

    // on récupère dans une constante la fonction addMoreItem qui est passée dans l'application 
    // via le le context StoreAPI.Provider qui englobe l'application
    const {addMoreItem} = useContext(StoreApi);

    // constante d'état pour le onChange
    const [itemContent, setItemContent] = useState('');

    // fonction HandleOnChange selon l'event
    const handleOnChange = (event) => {
        setItemContent(event.target.value);
    };

    // fonction qui gère l'action au niveau du Bouton de confirmation 
    // de l'ajout d'un item dans une liste
    const handleBtnConfirm = () => {
        addMoreItem(itemContent, listId);
        setItemContent('');
        setOpenInputCard(false);
    };

    // fonction qui gère l'action au niveau du Blur de l'input
    const handleBlur = () => {
        setOpenInputCard(false);
    };

    
    // Zone d'ajout/édition d'un nouvel item dans une liste
    return (
        <div className="input-card">
            <InputBase 
                // pour permettre que le nouveau contenu soit pris en compte dans les datas
                onChange={handleOnChange}
                value={itemContent}
                multiline
                fullWidth 
                inputProps ={{
                    className:"add-item-input"
                }}
                placeholder="Contenu de l'item..."
                // on ferme la zone d'édition quand on clique a l'extrieur de la zone
                onBlur={handleBlur}
            /> 
            <Button 
                className="add-item-btnConfirm"
                // on ferme la zone d'édition quand on clique sur le bouton " Ajouter "
                onClick={handleBtnConfirm}
            >
                Ajouter
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
