import React, { useState } from 'react';
import InputCard from './InputCard';
import { Collapse, Typography } from '@material-ui/core';

function InputContainer() {

    // constante d'état contrôlant l'ouverture/fermeture de l'InputCard
    const [openInputCard, setOpentInputCard] = useState(false);

    return (
        <div className="input-container">
            {/** collapse permet de créer une "animation" d'ouvertue/fermeture 
             * afin d'afficher l'InputCard quand nécessaire 
             * le " in={} " prend en paramètre l'état auquel il s'affiche */}
            <Collapse in={openInputCard}>
                <InputCard
                    // on passe la possibilité de modifier l'état à l'InputCard 
                    // pour pouvoir l'utiliser dans celle-ci (clic bouton) (porps)
                    setOpenInputCard={setOpentInputCard}
                />
            </Collapse>
            <Collapse in={!openInputCard}>
                <Typography
                    onClick={() => setOpentInputCard(!openInputCard)}
                >+ Ajouter un Item</Typography>
            </Collapse>
        </div>
    )
}

export default InputContainer;
