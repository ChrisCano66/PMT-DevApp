import React from 'react';
import { IconButton, InputBase, Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

function InputCard({setOpenInputCard}) {
    return (
        <div className="input-card">
            <InputBase 
                multiline
                autoFocus
                fullWidth 
                inputProps ={{
                    className:"add-item-input"
                }}
                placeholder="Contenu de l'item..."
                // on ferme la zone d'édition quand on clique a l'extrieur de la zone
                onBlur={() => setOpenInputCard(false)}
            /> 
            <Button 
                className="add-item-btnConfirm"
                // on ferme la zone d'édition quand on clique sur le bouton " Ajouter "
                onClick={() => setOpenInputCard(false)}
            >Ajouter</Button>
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
