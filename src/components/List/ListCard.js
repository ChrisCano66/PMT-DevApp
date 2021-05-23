import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import ListCardTitle from './ListCardTitle';
import ItemCard from '../Items/ItemCard';
import InputContainer from '../Inputs/InputContainer';


function ListCard({ list }) {
    return (
        // une liste avec un titre et contient, dynamiquement, l'ensemble de ses items
        <div className="list-card">
            
            {/** titre de la liste auquel on passe le titre de la liste stocker dans le Store */}
            <ListCardTitle title={list.content} listId={list.id}/>

            {/** zone d'item droppable */}
            <Droppable droppableId={list.id}>
                {/** la zone droppable doit être sous forme de fonction afin d'y passer des props nécessaire au fonctionnement du DnD */}
                {(provided) => (<div 
                    // le DnD a besoin d'une ref spécial fourni par lui même afin de connaître les zones de référence
                    // ainsi que de faire appelle au props propre à lui-même
                    ref={provided.innerRef} {...provided.droppableProps} className="container item"
                >
                    {/** on boucle sur les items présents dans la list !! */}
                    {list.itemIds.map((itemId, index) => {
                        // constante qui récupère l'ensemble des données de la liste ciblé par le mappage 
                        const item = list.items[itemId];
                        console.log(item);
                        // on return la Liste des items
                        return (
                            <ItemCard key={itemId} listId={list.id} item={item} index={index}/>
                    )})}
                    {/** le placeholder permet de créer une zone "vide" entre les items lorsque que le DnD sera activé
                     * de plus cela permet de voir la zone où l'on veut placer l'item */}
                    {provided.placeholder}
                </div>)}                  
            </Droppable> 

            {/** partie servant à l'ajout d'un item dans la liste 
             * on y passe l'id de la liste pour savoir dans qu'elle liste 
             * on doit ajouter le nouveau contenu */}
            <InputContainer listId={list.id}/>
            
        </div>
    )
}

export default ListCard;
