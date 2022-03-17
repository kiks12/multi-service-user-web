

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



    // this function saves image URL to the session storage of the browser
    // this takes key and file as parameters
    // this is used later on for persisting images, cover, and profile picture without 
    // uploading to server fully
    // this function does not return anything
    const saveImageToSessionStorage = (key: string, file: File) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            // the sessionStorage item key will be the key parameter
            // while the value will be the reader result
            sessionStorage.setItem(key, reader.result as string);
        })
        reader.readAsDataURL(file);
    }




    // this is the controller of cover input 
    const handleCoverChange = (e: any) => {
        const file : File = e.target.files[0];
        // persist cover photo in session storage
        saveImageToSessionStorage('cover', file);
        setCover(file);
    }



    // this is the controller of the profile picture input
    const handleProfileChange = (e: any) => {
        const file : File = e.target.files[0];
        // persist profile picture in session storage
        saveImageToSessionStorage('profile', file);
        setProfile(file);
    }



    // this is the base controller of the images input
    // this handles multiple files unlike
    // the cover and profile controller
    // this will return a promise with the image files
    const setImagesFiles = async (e: any) => {
        // instantiate imageFiles array
        let imagesFiles : File[] = [];
        // iterate through the files uploaded in input file
        for (let i=0; i<e.target.files.length; i++){
            // append each file to imageFiles
            imagesFiles.push(e.target.files[i]);
        }
        setImages(imagesFiles);
        return Promise.resolve(imagesFiles);
    }



    // this function come hand in hand with setImagesFiles 
    // the two functions will be chained together to final controller 
    // of images input. Here, we will iterate through the images Array, 
    // given as parameter and save each image file to sessionStorage
    const persistImages = (images: File[]) => {
        images.forEach((file: File) => {
            // save each image to sessionStorage with key of file name
            saveImageToSessionStorage(file.name, file);
        })
    }



    // this is the final controller of images input
    // this function calls the two previous ones in correct order
    // with promises, to successfully manage the states and sessionStorage data.
    const handleImagesChange = async (e: any) => {
        // set the images state
        const images = await setImagesFiles(e)
        // save the image files to sessionStorage
        persistImages(images);
    }



    // This function is the getter of persisted cover photo
    const getPersistedCoverPhoto = useCallback(() => {
        const file : any = sessionStorage.getItem('cover');
        const coverData = dataURLtoFile(file as string, 'cover');
        setCover(coverData);
    }, []);




    // This function is the getter of persisted profile picture
    const getPersistedProfilePicture = useCallback(() => {
        const file : any = sessionStorage.getItem('profile');
        const profilePictureData = dataURLtoFile(file as string, 'profile');
        setProfile(profilePictureData);
    }, []);




    // This function is the getter of persisted uploaded images 
    const getPersistedImages = useCallback(() => {
        // instantiate images Array
        let images :any[] = [];
        // iterate through every session storage key value pairs
        for (let i=0; i<sessionStorage.length; i++) {
            const imageName = sessionStorage.key(i) as string;
            // check if current image file name is cover or profile 
            // then do nothing 
            if (imageName === 'cover' || imageName === 'profile') continue; 
            // otherwise fetch the file in sessionStorage 
            const file: any = sessionStorage.getItem(imageName);
            // convert the data URL to File object
            const imageData = dataURLtoFile(file as string, imageName);
            images.push(imageData);
        }
        // set images state
        setImages(images);
    }, []);





    // this function converts image data url to File
    // this takes dataUrl and filename as parameters
    const dataURLtoFile = (dataUrl: string, fileName: string) => {
        // if dataUrl is null or undefined then terminate and return null
        if (!dataUrl) return null;
        // otherwise process the dataUrl
        const arr:any = dataUrl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        // then return the image file
        return new File([u8arr], fileName, {type:mime});
    }




    // this is the onload function of the document.
    // this will call all three persisted data getters
    // this will occur each load of the page
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