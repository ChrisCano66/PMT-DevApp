import React from 'react';
import ListCardTitle from './ListCardTitle';
import ItemCard from '../Items/ItemCard';
import InputContainer from '../Inputs/InputContainer';

function ListCard() {
    return (
        // une liste avec un titre et contient, dynamiquement, l'ensemble de ses items
        <div className="list-card">
            <div>
                <ListCardTitle/>
            </div>
            <div>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
            </div>
            <div>
                <InputContainer />
            </div>
        </div>
    )
}

export default ListCard
