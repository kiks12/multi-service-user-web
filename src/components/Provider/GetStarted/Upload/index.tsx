

import React, { useState } from 'react';
import { useAuthentication } from '../../../../custom-hooks/useAuthentication';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faImage
} from '@fortawesome/free-regular-svg-icons';



import styles from './Upload.module.css';
import Image from 'next/image';



const UploadImages : React.FC = () => {

    const { session } = useAuthentication();
    const [profile, setProfile] = useState<any>(null);
    const [cover, setCover] = useState<any>('');
    const [images, setImages] = useState<any[]>([]);
    const [videos, setVideos] = useState<any[]>([]);


    const handleCoverChange = (e: any) => {
        setCover(e.target.files[0]);
    }


    const handleProfileChange = (e: any) => {
        setProfile(e.target.files[0]);
    }


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
                {

                }
            </div>
        </div>
    )
}



export default UploadImages;