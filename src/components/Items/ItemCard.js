import React from 'react';

function ItemCard({ item }) {
    return (
        <div className="item-card">
            {/** on affiche le contenu de l'item */}
            <p>{item.content}</p>
        </div>
    )
}

export default ItemCard;
