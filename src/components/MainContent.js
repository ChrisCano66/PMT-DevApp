import React from 'react';
import ListCard from './List/ListCard';

function MainContent() {
    return (
        <div className="main-content">
            <ListCard/>
            <ListCard/> 
            <ListCard/>          
        </div>
    )
}

export default MainContent
