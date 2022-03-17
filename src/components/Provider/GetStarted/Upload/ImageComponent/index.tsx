


import React, { useEffect } from 'react';


import Image from 'next/image';



import styles from './Image.module.css';



interface ImageProps {
    file: string | File;
}



const ImageComponent : React.FC<ImageProps> = ({ file }) => {

    return (
        <div className={styles.container}>
            <Image
                src={`${typeof file === 'string' ? file : URL.createObjectURL(file)}`}
                alt='image'
                objectFit='cover'
                height={250}
                width={250}
            />
        </div>
    )
}



export default ImageComponent;