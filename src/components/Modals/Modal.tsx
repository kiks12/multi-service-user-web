


import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';



const Modal : React.FC = ({children}) => {
    return (
        <AnimatePresence>
            <motion.div
                animate={{
                    scale: [30, 1],
                    opacity: [0, 0, 0, 1],
                }}
                transition={{
                    duration: 0.2,
                }}
                className='modal-container'
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}



export default Modal;