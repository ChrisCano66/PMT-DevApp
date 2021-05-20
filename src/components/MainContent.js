import React from 'react';
import ListCard from './List/ListCard';

function MainContent() {
    return (
        // partie principale de l'application (contient, dynamiquement, l'ensemble des listes)
        <div className="main-content">
            <ListCard/>
            <ListCard/> 
            <ListCard/>          
        </div>
    )
}

export default MainContent
