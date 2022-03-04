


import React from 'react';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClose
} from '@fortawesome/free-solid-svg-icons';



import LeftNavbar from '..';



import useClickOutsideElement from '../../../../custom-hooks/useClickOutsideElement';



interface ModalLeftNavbarProps {
    closeMenu: () => void;
}



const ModalLeftNavbar: React.FC<ModalLeftNavbarProps> = ({ closeMenu }) => {

    const modalLeftNavbarRef = useClickOutsideElement(closeMenu);


    return (
        <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(10, 10, 10, 0.7)',
            zIndex: '100'
        }}>
            <div 
                style={{
                    backgroundColor: 'var(--white)',
                    width: '70%',
                    height: '100%'
                }}
                ref={modalLeftNavbarRef}
            >
                <div style={{
                    padding: '1em'
                }}>
                    <FontAwesomeIcon 
                        icon={faClose}
                        style={{
                            cursor: 'pointer'
                        }}
                        onClick={closeMenu}
                    />
                </div>
                <LeftNavbar />
            </div>
        </div>
    )
}



export default ModalLeftNavbar;