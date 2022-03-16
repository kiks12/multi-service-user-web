

import React, { useEffect, useState } from 'react';
import { useAuthentication } from '../../../../custom-hooks/useAuthentication';
import { encode, decode } from 'js-base64';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faImage
} from '@fortawesome/free-regular-svg-icons';



import styles from './Upload.module.css';
import Image from 'next/image';
import AddImageButton from './AddImageButton';
import ImageComponent from './ImageComponent';




const UploadImages : React.FC = () => {

    const { session } = useAuthentication();
    const [profile, setProfile] = useState<any>(null);
    const [cover, setCover] = useState<any>('');
    const [images, setImages] = useState<File[]>([]);
    const [videos, setVideos] = useState<any[]>([]);


    const handleCoverChange = (e: any) => {
        setCover(e.target.files[0]);
    }


    const handleProfileChange = (e: any) => {
        setProfile(e.target.files[0]);
    }


    const handleImagesChange = async (e: any) => {
        for (let i=0; i<e.target.files.length; i++){
            setImages(prev => [...prev, e.target.files[i]]);
        }
    }


    useEffect(() => {
        console.log(localStorage.getItem('images'));
    }, []);


    useEffect(() => {
        const imagesFiles = images.map((file: File) => {
            return URL.createObjectURL(file);
        })
        localStorage.setItem('images', JSON.stringify(imagesFiles));
    }, [images]);


    return (
        <div className={styles.container}>
            <div className={styles.coverContainer}>
                <div className={styles.cover}>
                    {
                        !cover ?
                        <>
                            <label
                                htmlFor='cover'
                            >
                                <FontAwesomeIcon icon={faImage} size='3x'/>
                            </label>
                            <input 
                                id='cover' 
                                type='file' 
                                onChange={handleCoverChange}
                                multiple={false}
                                accept='image/png, image/gif, image/jpeg'
                            />
                        </> 
                        : 
                        <Image 
                            src={`${URL.createObjectURL(cover)}`} 
                            alt='cover' 
                            objectFit='fill' 
                            width={1200} 
                            height={300}
                        />
                    }
                </div>
                <div className={styles.profileContainer}>
                    <div className={styles.profile}>
                        {
                            !profile ? 
                            <>
                                <label htmlFor='profile'>
                                    <FontAwesomeIcon icon={faImage} size='2x'/>
                                </label>
                                <input 
                                    id='profile' 
                                    type='file' 
                                    onChange={handleProfileChange}
                                    multiple={false}
                                    accept='image/png, image/gif, image/jpeg'
                                />    
                            </>
                            :
                            <Image 
                                src={`${URL.createObjectURL(profile)}`}
                                alt='profile'
                                objectFit='fill'
                                height={150}
                                width={150}
                            />
                        }
                    </div>
                    <p>{!session?.shopName ? 'No Shop Name yet' : session?.shopName}</p>
                </div>
            </div>

            <div className={styles.images}>
                <h2>Images</h2>
                <div className={styles.imagesGrid}> 
                    {
                        images.length !== 0 &&
                        images.map((imageFile: File, idx: number) => {
                            return <ImageComponent key={idx} file={imageFile}/>
                        })
                    }
                    <AddImageButton 
                        onChange={handleImagesChange}
                    />
                </div>
            </div>
            <div className={styles.videos}>
                <h2>Videos</h2>
                <div>
                    {
                        
                    }
                </div>
            </div>
        </div>
    )
}



export default UploadImages;