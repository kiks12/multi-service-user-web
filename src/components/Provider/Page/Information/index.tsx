
import React, { useState } from 'react';



import { Provider } from '../../../../../types';
import useSplitArray from '../../../../custom-hooks/useSplitArray';


import styles from './Information.module.css';



interface ProviderPageInformationProps {
    provider: Provider;
}



const ProviderPageInformation : React.FC<ProviderPageInformationProps> = ({ provider }) => {

    const [seeMore, setSeeMore] = useState<boolean>(false);
    const skillsArray = useSplitArray({
        stringToSplit: provider.skills as string,
        splitter: '|',
    })


    return (
        <>
            {/* <pre>{JSON.stringify(provider, null, 2)}</pre> */}
            <div className={seeMore ? styles.containerSeeMore : styles.container}>
                <div className={styles.containerPadding}>
                    <h3>Information</h3>
                    
                    <div>
                        <p>Username: {provider.username}</p>
                        <p>Address: {provider.address}</p>
                        <p>Contact: {provider.contact}</p>
                    </div>

                    <div style={{margin: '2em 0 0 0'}}>
                        <p>Skills: </p>
                        <ul className="skills-ul">
                            {
                                (provider.skills && skillsArray) ? (
                                    skillsArray.map((skill: string, idx: number) => {
                                        return (
                                            <li 
                                                key={idx}
                                                className="skills-li"
                                            >
                                                {skill}
                                            </li>
                                        )
                                    })
                                ) : (
                                    <p>No Skills</p>
                                )
                            }
                        </ul>
                    </div>


                    <div className={styles.shopDescription}>
                        <p>Shop Description: </p>
                        <textarea 
                            value={provider.description as string} 
                            readOnly={true}
                        />
                    </div>
                </div>


                <div className="">
                    <button 
                        className={styles.seeMoreButton}
                        onClick={() => setSeeMore(prev => prev = !prev)}
                    >
                    {seeMore ? 'See Less' : 'See More'}
                    </button>
                </div>
            </div>
        </>
    )
}



export default ProviderPageInformation;