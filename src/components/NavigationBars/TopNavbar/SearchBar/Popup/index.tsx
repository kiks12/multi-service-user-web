
/*

Multi Service Platform - User Popup Search bar Component
Created: Mar. 04, 2022
Last Updated: Mar. 04, 2022
Author: Tolentino, Francis James S.

*/



import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



import React from 'react';



import SearchBar from '..';
import useClickOutsideElement from '../../../../../custom-hooks/useClickOutsideElement';



interface PopupSearchBarProps {
    closeSearchBar: () => void;
}



const PopupSearchBar: React.FC<PopupSearchBarProps> = ({ closeSearchBar }) => {


    const popupSearchBarRef = useClickOutsideElement(closeSearchBar);


    return (
        <div
            style={{
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                height: '3em',
                backgroundColor: 'var(--white)',
                display: 'flex',
                padding: '0.25em 1em',
                zIndex: '100',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '0.3px solid var(--gray)'
            }}
            ref={popupSearchBarRef}
        >
            <FontAwesomeIcon 
                icon={faClose}
                style={{
                    cursor: 'pointer'
                }}
                onClick={closeSearchBar}
            />
            <div
                style={{
                    flex: '1',
                    margin: '0 0 0 1em'
                }}
            >
                <SearchBar />
            </div>
        </div>
    )
}



export default PopupSearchBar;