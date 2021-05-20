import React from 'react';
import ListCardTitle from './ListCardTitle';
import ItemCard from '../Items/ItemCard';
import InputContainer from '../Inputs/InputContainer';

function ListCard({ list }) {
    return (
        // une liste avec un titre et contient, dynamiquement, l'ensemble de ses items
        <div className="list-card">
            <div>
                {/** titre de la liste auquel on passe le titre de la liste stocker dans le Store */}
                <ListCardTitle title={list.title}/>
            </div>

            {/** on boucle sur les items présents dans la list !! */}
            {list.items.map((item) => (
                // on passe les infos de l'item sélectionnée à la l'item pour afficher les infos
                // key pour le mappage
                <ItemCard key={item.id} item={item}/>
            ))}    
            {/** partie servant à l'ajout d'un item dans la liste */}            
            <div>
                <InputContainer />
            </div>
        </div>
    )
}

export default ListCard
