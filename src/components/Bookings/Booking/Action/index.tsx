

import React from 'react';
import useClickOutsideElement from '../../../../custom-hooks/useClickOutsideElement';


import styles from './Action.module.css';


interface ActionsProps {
    setOpenActionButton: React.Dispatch<React.SetStateAction<boolean>>;
}



const Actions : React.FC<ActionsProps> = ({ setOpenActionButton }) => {

    const divRef = useClickOutsideElement(() => {
        setOpenActionButton(false);
    })


    return (
        <div 
            ref={divRef}
            className={styles.container}
        >
            <button>
                Cancel
            </button>
        </div>
    )
};




export default Actions;