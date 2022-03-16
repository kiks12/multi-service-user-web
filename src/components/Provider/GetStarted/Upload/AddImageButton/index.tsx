


import React from 'react';



import styles from './AddImageButton.module.css';



interface AddImageButtonProps {
    onChange: (e: any) => void;
}



const AddImageButton : React.FC<AddImageButtonProps> = ({ onChange }) => {

    return (
        <div className={styles.container}>
            <label htmlFor='images'>
                +
            </label>
            <input 
                id='images'
                type='file'
                accept='image/png, image/gif, image/jpeg'
                multiple={true}
                onChange={onChange}
            />
        </div>
    )
}




export default AddImageButton;