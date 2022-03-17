

import React, { useCallback, useEffect, useState } from 'react';
import { useAuthentication } from '../../../../custom-hooks/useAuthentication';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faImage
} from '@fortawesome/free-regular-svg-icons';



import styles from './Upload.module.css';
import NextImage from 'next/image';
import AddImageButton from './AddImageButton';
import ImageComponent from './ImageComponent';




const UploadImages : React.FC = () => {

    const { session } = useAuthentication();
    const [profile, setProfile] = useState<any>(null);
    const [cover, setCover] = useState<any>('');
    const [images, setImages] = useState<File[]|string[]>([]);
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
        images.forEach((file: File) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                sessionStorage.setItem(file.name, reader.result as string);
            })
            reader.readAsDataURL(file);
        })
        return Promise.resolve();
    }




    const handleImagesChange = async (e: any) => {
        const images = await setImagesFiles(e)
        await persistImages(images);
    }



    const getPersistedImages = useCallback(() => {
        let images = [];
        for (let i=0; i<sessionStorage.length; i++) {
            const file: any = sessionStorage.getItem(sessionStorage.key(i) as string);
            const imageData = dataURLtoFile(file as string, sessionStorage.key(i) as string);
            images.push(imageData);
        }
        setImages(images);
    }, []);



    const dataURLtoFile = (dataUrl: string, fileName: string) => {
        const arr:any = dataUrl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], fileName, {type:mime});
    }




    useEffect(() => {
        getPersistedImages();
    }, [getPersistedImages]);



    useEffect(() => {
        console.log('images: ', images);
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
                        <NextImage 
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
                            <NextImage 
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
                        images.map((imageFile: string | File, idx: number) => {
                            return <ImageComponent key={idx} file={imageFile}/>
                        })
                    }
                    {/* {
                        (proxyImages.length !== 0 && images.length === 0) &&
                        proxyImages.map((src: string, idx: number) => {
                            return <NextImage 
                                src={`${src}`}
                                alt='image'
                                key={idx}
                                objectFit='cover'
                                height={250}
                                width={250}
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