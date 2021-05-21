import React, { useState }  from 'react';
import { Typography, InputBase, IconButton } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ClearIcon from '@material-ui/icons/Clear';

function ListCardTitle( { title }) {

    // constante d'état permette de savoir si on édite ou non le titre de la liste
    const [openTitle, setOpenTitle] = useState(false);

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
                        value={title} 
                        autoFocus
                        fullWidth 
                        inputProps ={{
                            className:"list-title-input"
                        }}
                        onBlur={() => setOpenTitle(!openTitle)}
                    />
                    <IconButton 
                        // on ferme la zone d'édition quand on clique sur le bouton " X "
                        onClick={() => setOpenTitle(false)}
                    >
                        <ClearIcon/>
                    </IconButton>  
                    <IconButton 
                        // on ferme la zone d'édition quand on clique sur le bouton " X "
                        onClick={() => setOpenTitle(false)}
                    >
                        <ClearIcon/>
                    </IconButton>                     
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
