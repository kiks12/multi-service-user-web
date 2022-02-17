
/*

Multi Service Platform - Users Home Content
Created: Feb. 17, 2022
Last Updated: Feb. 17, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';
import Categories from './Categories';



import Promos from './Promos';



const HomeContent: React.FC = () => {
    return (
        <div style={{padding: '1em 0'}}>
            <Promos />
            <Categories />
            {/* Recommended for you */}
            {/* Top Services */}
            {/* Trending Searches */}
        </div>
    )
}



export default HomeContent;