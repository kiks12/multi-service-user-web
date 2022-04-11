
import Image from 'next/image';
import React from 'react';



import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



import { Provider } from '../../../../../types';



import styles from './Header.module.css';



interface ProviderPageHeaderProps {
    provider: Provider;
}



const ProviderPageHeader : React.FC<ProviderPageHeaderProps> = ({provider}) => {
    return (
        <div>
            {/* <pre>{JSON.stringify(provider, null, 2)}</pre> */}
            <div className={styles.cover}>
                <div className={styles.container}>
                    Cover Photo
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.informationContainer}>
                    <div className={styles.profileContainer}>
                        <div className={styles.profile}>
                            {
                                provider.image && 
                                <Image 
                                    src={provider.image} 
                                    alt={provider.username as string}   
                                    height={500}
                                    width={500}
                                    blurDataURL='data...'   
                                    placeholder='blur'
                                />
                            }
                        </div>

                        <div className={styles.basicInfo}>
                            <div className={styles.title}>
                                <h3>{provider.shopName}</h3>
                                {
                                    provider.verifiedProvider &&
                                    <FontAwesomeIcon icon={faCircleCheck}/>
                                }
                            </div>
                            <small>{provider.followers} followers</small>
                        </div>
                    </div>

                    <div className={styles.buttonContainer}>
                        <button className='main-button'>Follow</button>
                    </div>
                </div>


                <ul className="menu-ul">
                    <li className="menu-li-active">Home</li>
                    <li className="menu-li">Services</li>
                    <li className="menu-li">Gallery</li>
                </ul>

            </div>
        </div>
    )
}



export default ProviderPageHeader;