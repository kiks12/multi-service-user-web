

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
    const [videos, setVideos] = useState<any[]>([]);




    const saveImageToSessionStorage = (key: string, file: File) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            sessionStorage.setItem(key, reader.result as string);
        })
        reader.readAsDataURL(file);
    }



    const handleCoverChange = (e: any) => {
        const file : File = e.target.files[0];
        saveImageToSessionStorage('cover', file);
        setCover(file);
    }




    const handleProfileChange = (e: any) => {
        const file : File = e.target.files[0];
        saveImageToSessionStorage('profile', file);
        setProfile(file);
    }




    const setImagesFiles = async (e: any) => {
        let imagesFiles = [];
        for (let i=0; i<e.target.files.length; i++){
            imagesFiles.push(e.target.files[i]);
        }
        setImages(imagesFiles);
        return Promise.resolve(imagesFiles);
    }



    const persistImages = (images: any[]) => {
        images.forEach((file: File) => {
            saveImageToSessionStorage(file.name, file);
        })
    }



    const handleImagesChange = async (e: any) => {
        const images = await setImagesFiles(e)
        persistImages(images);
    }




    const getPersistedCoverPhoto = useCallback(() => {
        const file : any = sessionStorage.getItem('cover');
        const coverData = dataURLtoFile(file as string, 'cover');
        setCover(coverData);
    }, []);




    const getPersistedProfilePicture = useCallback(() => {
        const file : any = sessionStorage.getItem('profile');
        const profilePictureData = dataURLtoFile(file as string, 'profile');
        setProfile(profilePictureData);
    }, []);




    const getPersistedImages = useCallback(() => {
        let images :any[] = [];
        for (let i=0; i<sessionStorage.length; i++) {
            const imageName = sessionStorage.key(i) as string;
            if (imageName === 'cover' || imageName === 'profile') continue; 
            const file: any = sessionStorage.getItem(imageName);
            const imageData = dataURLtoFile(file as string, imageName);
            images.push(imageData);
        }
        setImages(prev => prev = images );
    }, []);





    const dataURLtoFile = (dataUrl: string, fileName: string) => {
        if (!dataUrl) return null;
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
        getPersistedCoverPhoto();
        getPersistedProfilePicture()
    }, [getPersistedImages, getPersistedCoverPhoto, getPersistedProfilePicture]);



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