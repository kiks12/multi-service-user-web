



import React from 'react';



const Modal : React.FC = ({children}) => {
    return (
        <div className='modal-container'>
            {children}
        </div>
    )
}



export default Modal;