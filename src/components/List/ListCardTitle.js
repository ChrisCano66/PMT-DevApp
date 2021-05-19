import React, { useState }  from 'react';
import { InputBase } from '@material-ui/core';

function ListCardTitle() {

    // constante d'état permette de savoir si on édite ou non le titre de la liste
    const [openTitle, setOpenTitle] = useState(false);

    // on retourne le titre selon l'état d'édition
    return (
        <div className="list-title">

            {/** on vérifie l'état de l'ouverture de l'édition du titre de la liste
             * s'il est ouvert on met l'inputText 
             * sinon, on affiche simplement le titre */}
            {openTitle ? (
                <div className="list-title-input">
                    <InputBase value="Todo"/>
                </div>
            ) : (
                <div className="list-title-standing">
                    <h3 onClick={() => setOpenTitle(!openTitle)}>todo</h3>
                </div>
            )}

        </div>                
    )
}

export default ListCardTitle
