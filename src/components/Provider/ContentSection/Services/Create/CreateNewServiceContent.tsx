
/*

Multi Service Platform - Provider main Create Service Component
Created: Feb. 14, 2022
Last Updated: Feb. 15, 2022
Author: Tolentino, Francis James S.

*/



import React, { useState } from 'react';



import { useAuthentication } from '../../../../../custom-hooks/useAuthentication';



const CreateService: React.FC = () => {

    const { session } = useAuthentication();

    const [title, setTitle] = useState<string>('');
    const [details, setDetails] = useState<string>('');
    const [type, setType] = useState<'Flat Rate' | 'Range'>('Flat Rate');
    const [startingPrice, setStartingPrice] = useState<string>('');
    const [lastPrice, setLastPrice] = useState<string>('');


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
                    <button
                        type='submit'
                        onClick={async (e) => {
                            e.preventDefault();

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
                                        startingPrice: startingPrice, 
                                        lastPrice: lastPrice
                                    })
                                })
                            } catch (e) {
                                console.error(e);                            
                            }
                            
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