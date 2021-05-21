import React from 'react';
import ListCardTitle from './ListCardTitle';
import ItemCard from '../Items/ItemCard';
import InputContainer from '../Inputs/InputContainer';

function ListCard({ list }) {
    return (
        // une liste avec un titre et contient, dynamiquement, l'ensemble de ses items
        <div className="list-card">
            {/** titre de la liste auquel on passe le titre de la liste stocker dans le Store */}
            <ListCardTitle title={list.content} listId={list.id}/>

            {/** on boucle sur les items présents dans la list !! */}
            {list.itemIds.map((itemId) => {
                // constante qui récupère l'ensemble des données de la liste ciblé par le mappage 
                const item = list.items[itemId];
                // on return la Liste des items
                return (
                    <ItemCard key={itemId} listId={list.id} item={item}/>
            )})}    
            {/** partie servant à l'ajout d'un item dans la liste 
             * on y passe l'id de la liste pour savoir dans qu'elle liste 
             * on doit ajouter le nouveau contenu */}
            <InputContainer listId={list.id}/>
        </div>
    )
}

export default ListCard
