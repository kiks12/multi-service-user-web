

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
    const [proxyImages, setProxyImages] = useState<any[]>([]);
    const [videos, setVideos] = useState<any[]>([]);


    const handleCoverChange = (e: any) => {
        setCover(e.target.files[0]);
    }


    const handleProfileChange = (e: any) => {
        setProfile(e.target.files[0]);
    }


    const setImagesFiles = async (e: any) => {
        let imagesFiles = [];
        for (let i=0; i<e.target.files.length; i++){
            imagesFiles.push(e.target.files[i]);
        }
        setImages(imagesFiles);
        return Promise.resolve(imagesFiles);
    }


    const persistImages = async (images: any[]) => {
        let imagesData : any[] = [];
        images.forEach((file: File) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                imagesData.push(reader.result?.toString());
            })
            reader.readAsDataURL(file);
        })
        console.log('data: ', imagesData);
        localStorage.setItem('images', JSON.stringify(imagesData));
        return Promise.resolve();
    }


    const handleImagesChange = async (e: any) => {
        await setImagesFiles(e).then(async (images) => {
            console.log(images);
            await persistImages(images);
        });
    }


    useEffect(() => {
        console.log(localStorage.getItem('images'));
    }, []);



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
                    {/* {
                        proxyImages.length !== 0 &&
                        proxyImages.map((src: any, idx: number) => {
                            return <Image 
                                src={`${src}`}
                                alt='image'
                                key={idx}
                                objectFit='cover'
                                height={150}
                                width={150}
                            />
                        })
                    } */}
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