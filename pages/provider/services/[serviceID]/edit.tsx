
/*

Multi Services Platform - Provider Edit existing Service Page
Created: Feb. 23, 2022
Last Updated: Feb. 23, 2022
Author: Tolentino, Francis James S.

*/



import type { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage } from "next";
import Image from "next/image";




import React, { useEffect, useMemo, useState } from "react";



import { useAuthentication } from "../../../../src/custom-hooks/useAuthentication";
import useSplitArray from "../../../../src/custom-hooks/useSplitArray";



import Layout from "../../../../src/components/Provider/Layout/ProviderLayout";



import fetchUserInformation from "../../../../libs/fetchUserInformation";
import { __backend__ } from "../../../../src/constants";
import authorizedFetch from "../../../../utils/authorizedFetch";
import Modal from "../../../../src/components/Modals/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";






const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP'
})






const CreateService: NextPage = ({
    user,
    accessToken
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { session, setSession } = useAuthentication();
    const router = useRouter();



    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);
    }, [setSession, user]);



    const [openModal, setOpenModal] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');


    const [title, setTitle] = useState<string>('');
    const [details, setDetails] = useState<string>('');
    const [type, setType] = useState<'Flat Rate' | 'Range'>('Flat Rate');
    const [startingPrice, setStartingPrice] = useState<string>('0');
    const [lastPrice, setLastPrice] = useState<string>('0');
    const [uploadedImages, setUploadedImages] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);



    const [skillsArrayIndex, setSkillsArrayIndex] = useState<number>(0);
    const skillsArray = useSplitArray({
        stringToSplit: session?.skills ? session.skills as string : '',
        splitter: '|',
    });




    const memoizedUploadedImages = useMemo(() => {
        return uploadedImages.map(image => URL.createObjectURL(image));
    }, [uploadedImages]);




    const formattedStartingPrice = useMemo(() => {
        return formatter.format(parseInt(startingPrice, 10));
    }, [startingPrice]);




    const formattedLastPrice = useMemo(() => {
        return formatter.format(parseInt(lastPrice, 10));
    }, [lastPrice]);





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

            const res = await authorizedFetch({
                url: `${__backend__}/provider/services/upload-images?serviceId=${serviceId}/`,
                accessToken: accessToken,
                body: formData,
                method: 'POST',
            })


            return res;
        } catch (e) {
            console.error(e);
        }
    }




    const postNewService = async () => {
        try {
            const res = await authorizedFetch({
                url: `${__backend__}/provider/services/create`,
                method: 'POST',
                accessToken: accessToken,
                body: JSON.stringify({
                    title: title,
                    details: details,
                    categories: categories.join(' | '),
                    type: type,
                    startingPrice: parseInt(startingPrice, 10),
                    lastPrice: parseInt(lastPrice, 10)
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            return res;
        } catch (e) {
            console.error(e);                            
        }
    }





    const publishServiceToDatabase = async (e:any) => {
        e.preventDefault();
        const { serviceId, msg } = await postNewService();
        const { msg: msg2 } = await uploadImages(serviceId);
        setMessage(msg + " and " + msg2);
        setOpenModal(true);
    }





    const imageInputOnchangeHandler = (e: any) => {
        e.preventDefault();
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
    }





    return (
        <>
            <Layout>
                <div style={{
                    margin: '1em 0'
                }}>
                    <div className='card'>
                        <h2>Create new Service</h2>
                    </div>    
                    <div>
                        <form>

                            <div 
                                className='card'
                                style={{
                                    margin: '1em 0'
                                }}
                            >
                                <h2>Title and Description</h2>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        margin: '1em 0'
                                    }}
                                >
                                    <label>Title</label>
                                    <input
                                        className='form-control'
                                        placeholder='Ultimate Laundry Wow'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required 
                                    />
                                </div>



                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        margin: '1em 0'
                                    }}
                                >
                                    <label>Details</label>
                                    <textarea
                                        className='form-control'
                                        style={{
                                            height: '30vh',
                                            resize: 'none'
                                        }}
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            
                            <div className='card'>
                                <h2>Category</h2>
                                <div style={{
                                    margin: '1em 0'
                                }}>
                            
                                    {
                                        categories.length !== 0 && categories.map((category, idx) => {
                                            return (
                                                <div 
                                                    key={idx}
                                                    style={{
                                                        display: 'flex',
                                                        margin: '1em 0'
                                                    }}
                                                >
                                                    <select 
                                                        className='form-control' 
                                                        style={{width: '90%'}}
                                                    >
                                                        {
                                                            skillsArray.length !== 0 && skillsArray.map((skill, idx2) => {
                                                                if (skill === '') return <React.Fragment key={idx2}>{skill}</React.Fragment>
                                                                return <option key={idx2}>{skill}</option>
                                                            })
                                                        }
                                                    </select>
                                                    <button
                                                        type='button'
                                                        style={{
                                                            width: '10%',
                                                            marginLeft: '1em'
                                                        }}
                                                        onClick={() => {
                                                            setCategories((prev) => {
                                                                return prev.filter((_cat, idxCat) => idx !== idxCat);
                                                            })
                                                            setSkillsArrayIndex(prev => prev -= 1);
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )
                                        })
                                    }

                                    <div style={{
                                        display: 'flex'
                                    }}>
                                        <div style={{width: '90%'}}>
                                            <input className='form-control' disabled/>
                                        </div>
                                        <button 
                                            type='button'
                                            style={{
                                                marginLeft: '1em',
                                                width: '10%'
                                            }}
                                            onClick={() => {
                                                setCategories(prev => [...prev, skillsArray[skillsArrayIndex]])
                                                setSkillsArrayIndex(prev => prev += 1)
                                            }}
                                            disabled={skillsArrayIndex === skillsArray.length}
                                        >
                                            +
                                        </button>
                                    </div>

                                </div>
                            </div>


                            <div 
                                className='card'
                                style={{
                                    margin: '1em 0'
                                }}
                            >
                                <h2>Pricing</h2>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        margin: '1em 0'
                                    }}
                                >
                                    <label>Pricing Type</label>
                                    <select
                                        className='form-control'
                                        value={type}
                                        onChange={(e) => setType(e.target.value as 'Flat Rate' | 'Range')}
                                    >
                                        <option value='Flat Rate'>Flat rate</option>
                                        <option value='Range'>Range</option>
                                    </select>
                                </div>

                                

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        margin: '1em 0'
                                    }}
                                >
                                    <label>Starting Price</label>
                                    <div style={{
                                        display: 'flex'
                                    }}>
                                        <input
                                            className='form-control'
                                            type='number'
                                            value={startingPrice}
                                            onChange={(e) => setStartingPrice(e.target.value)} 
                                            required
                                        />
                                        <div style={{
                                            margin: '0 1em',
                                            padding: '0 1em',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <h3>{formattedStartingPrice}</h3>
                                        </div>
                                    </div>
                                </div>



                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        margin: '1em 0'
                                    }}
                                >
                                    <small className='warning-text'>
                                        <i>
                                            * Please Ignore if pricing type is flat rate
                                        </i>
                                    </small>    
                                    <label>Last Price</label>
                                    <div style={{
                                        display: 'flex'
                                    }}>
                                        <input 
                                            className='form-control'
                                            type='number'
                                            value={lastPrice}
                                            onChange={(e) => setLastPrice(e.target.value)}
                                            disabled={type === 'Flat Rate'}
                                        />
                                        <div style={{
                                            margin: '0 1em',
                                            padding: '0 1em',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <h3>{formattedLastPrice}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div 
                                className='card'
                                style={{
                                    margin: '1em 0'
                                }}
                            >
                                <h2>Gallery</h2>
                                <div
                                    style={{
                                        margin: '1em 0',
                                        display: 'flex'
                                    }}
                                >
                                    {
                                        memoizedUploadedImages.length !== 0 && memoizedUploadedImages.map((file, idx) => {
                                            return (
                                                <div 
                                                    key={idx}
                                                    style={{
                                                        height: '22.5vh',
                                                        width: '22.5vh',
                                                        overflow: 'hidden',
                                                        borderRadius: '0.5em',
                                                        marginRight: '1em'
                                                    }}
                                                >
                                                    <Image 
                                                        alt='' 
                                                        src={file} 
                                                        width={500} 
                                                        height={500}
                                                        objectFit='fill'
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                    <input
                                        name='files'
                                        id='files'
                                        type='file'
                                        accept="image/png, image/gif, image/jpeg"
                                        onChange={imageInputOnchangeHandler}
                                        multiple={true}
                                        className='upload-images-input-button'
                                    />
                                    <label htmlFor='files'>Upload Images</label>


                                </div>
                            </div>


                            <div style={{
                                padding: '1em 0 2em 0'
                            }}>
                                <button
                                    className='main-button'
                                    type='submit'
                                    onClick={publishServiceToDatabase}
                                    >
                                    Publish Service
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {
                    openModal &&
                    <Modal>
                        <div 
                            className="card"
                            style={{
                                width: 'min(30em , 90%)'
                            }}
                        >   
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                margin: '0 0 1em 0'
                            }}>
                                <h2>Message</h2>
                                <FontAwesomeIcon
                                    onClick={() => setOpenModal(false)}
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                    icon={faXmark}
                                />
                            </div>
                            <p>{message}</p>
                            <div style={{
                                margin: '2em 0 0 0'
                            }}>
                                <button onClick={() => {
                                    setOpenModal(false);
                                    router.push('/provider/services')
                                }}>
                                    Okay
                                </button>
                            </div>
                        </div>
                    </Modal>
                }
            </Layout>
        </>
    )
}




export const getServerSideProps: GetServerSideProps = async ({req}: GetServerSidePropsContext) => {

    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(req.cookies?.accessToken);


        if (!userInformation) {
            return {
                props: {
                    user: {},
                    accessToken: req.cookies.accessToken
                }
            }
        }



        return {
            props: {
                user: userInformation.user,
                accessToken: req.cookies.accessToken,
            }
        }
    }



    return {
        props: {
            user: {},
            accessToken: req.cookies.accessToken
        }
    }
}



export default CreateService;