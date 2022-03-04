
/*

Multi Service Platform - Search Bar Base Component
Created: Mar. 04, 2022
Last Updated: Mar. 04, 2022
Author: Tolentino, Francis James S.

*/



import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



import React from 'react';



const SearchBar: React.FC = () => {



    return (
        <form className='top-navbar-search-form'>
            <input 
                type='text'
                placeholder='Search for Services'
                className='form-control'
                style={{
                    width: '80%'
                }}
            />
            <div 
                style={{
                    width: '20%'
                }}
            >
                <button
                    type='submit'
                    className='button'
                    >
                    <FontAwesomeIcon 
                        icon={faMagnifyingGlass}
                        style={{
                            color: 'var(--secondaryPurple)',
                        }}
                    />
                </button>
            </div>
        </form>
    )
}



export default SearchBar;