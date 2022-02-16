
/*

Multi Service Platform - Provider main Create Service Component
Created: Feb. 14, 2022
Last Updated: Feb. 16, 2022
Author: Tolentino, Francis James S.

*/



import Image from 'next/image';
import React, { useState } from 'react';



import { useAuthentication } from '../../../../../custom-hooks/useAuthentication';



const CreateService: React.FC = () => {

    const { session } = useAuthentication();

    const [title, setTitle] = useState<string>('');
    const [details, setDetails] = useState<string>('');
    const [type, setType] = useState<'Flat Rate' | 'Range'>('Flat Rate');
    const [startingPrice, setStartingPrice] = useState<string>('');
    const [lastPrice, setLastPrice] = useState<string>('');
    const [uploadedImages, setUploadedImages] = useState<any[]>([]);



    const imagesFormData = () => {
        const formData = new FormData();

        if (uploadedImages){
            for (let i=0; i < uploadedImages.length; i++) {
                formData.append('files', uploadedImages[i]);
            }
        }

        return formData;
    }



    const uploadImages = async (serviceId: number) => {

        const formData = imagesFormData();
        try {
            const res = await fetch(`/api/provider/services/upload-images/?id=${session?.userId}&title=${title}&serviceId=${serviceId}`, {
                method: 'POST',
                body: formData,
            })

            const jsonRes = await res.json();
            
        } catch (e) {
            console.error(e);
        }
    }



    const postNewService = async () => {
        try {
            const res = await fetch(`/api/provider/services/create?id=${session?.userId}&accessToken=${session?.accessToken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title, 
                    details: details, 
                    type: type,
                    startingPrice: parseInt(startingPrice, 10), 
                    lastPrice: parseInt(lastPrice, 10)
                })
            })

            const jsonRes = await res.json();

            return jsonRes;
        } catch (e) {
            console.error(e);                            
        }
    }



    return (
        <div>
            <p>Create new Service</p>
            <div>
                <form>
                    <div>
                        <label>Title</label>
                        <input
                            placeholder='Ultimate Laundry Wow'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required 
                        />
                    </div>
                    <div>
                        <label>Details</label>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Pricing Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value as 'Flat Rate' | 'Range')}
                        >
                            <option value='Flat Rate'>Flat rate</option>
                            <option value='Range'>Range</option>
                        </select>
                    </div>
                    <div>
                        <label>Starting Price</label>
                        <input
                            type='number'
                            value={startingPrice}
                            onChange={(e) => setStartingPrice(e.target.value)} 
                            required
                        />
                    </div>
                    <div>
                        <label>Last Price</label>
                        <input 
                            type='number'
                            value={lastPrice}
                            onChange={(e) => setLastPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            name='files'
                            type='file'
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(e) => {
                                if (e.target.files){
                                    for (let i = 0; i < e.target.files?.length; i++){
                                        setUploadedImages(prev => {
                                            if (e.target.files){
                                                return [
                                                    ...prev, 
                                                    e.target.files[i]
                                                ]
                                            }

                                            return prev;
                                        })
                                    }
                                }
                            }}
                        />
                        {
                            uploadedImages.length !== 0 && uploadedImages.map((file, idx) => {
                                return <Image key={idx} src={URL.createObjectURL(file)} width={100} height={100}/>
                            })
                        }
                    </div>
                    <button
                        type='submit'
                        onClick={async (e) => {
                            e.preventDefault();
                            const res = await postNewService();
                            const { serviceId } = res;
                            await uploadImages(serviceId);
                        }}
                    >
                        Publish Service
                    </button>
                </form>
            </div>
        </div>
    )
}



export default CreateService;