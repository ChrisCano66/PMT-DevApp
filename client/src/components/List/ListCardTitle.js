import React, { useState, useContext } from 'react';
import StoreApi from '../../utils/StoreApi';
import { Typography, InputBase } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

function ListCardTitle( { title, listId }) {

    // on récupère la fonction updateListContent qui est passée dans l'application 
    // via le le context StoreAPI.Provider qui englobe l'application
    const {updateListContent} = useContext(StoreApi);

    // constante d'état permette de savoir si on édite ou non le titre de la liste
    const [openTitle, setOpenTitle] = useState(false);

    // constante d'état du titre et du nouveau titre (si modif) de la liste 
    // (par défaut c'est le titre enregistré dans le store)
    const [newTitle, setNewTitle] = useState(title);

    // Fonction qui gère le changement de titre de la liste
    const handleOnChange = (event) => {
        setNewTitle(event.target.value);
    };

    // Fonction qui gère la validation du changement de titre de la liste
    const handleOnBlur = () => {
        updateListContent(newTitle, listId);
        setOpenTitle(false);
    };

    // on retourne le titre selon l'état d'édition
    return (
        <div className="list-title">

            {/** on vérifie l'état de l'ouverture de l'édition du titre de la liste
             * s'il est ouvert on met l'inputText 
             * sinon, on affiche simplement le titre */}
            {openTitle ? (
                // ce qui s'affiche lorsque l'on veut éditer
                <div className="typo-input">
                    <InputBase 
                        onChange={handleOnChange}
                        value={newTitle} 
                        autoFocus
                        fullWidth 
                        inputProps ={{
                            className:"list-title-input"
                        }}
                        onBlur={handleOnBlur}
                    />                    
                </div>
            ) : (
                // ce qui s'affiche en temps normal (juste le titre)
                <div className="typo-title">
                    <Typography 
                        onClick={() => setOpenTitle(!openTitle)}  
                        className="list-title-standing"
                    >
                        {title}
                    </Typography>
                    <MoreHorizIcon />
                </div>
            )}

        </div>                
    )
}

export default ListCardTitle
