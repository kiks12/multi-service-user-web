
/*

Multi Service Platform - Provider main Create Service Component
Created: Feb. 14, 2022
Last Updated: Feb. 15, 2022
Author: Tolentino, Francis James S.

*/



import React, { useState } from 'react';



const CreateService: React.FC = () => {

    const [details, setDetails] = useState<string>('');

    return (
        <div>
            <p>Create new Service</p>
            <div>
                <form>
                    <div>
                        <label>Title</label>
                        <input />   
                    </div>
                    <div>
                        <label>Details</label>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Pricing Type</label>
                        <select>
                            <option>Flat rate</option>
                            <option>Range</option>
                        </select>
                    </div>
                    <div>
                        <label>Starting Price</label>
                        <input />
                    </div>
                    <div>
                        <label>Last Price</label>
                        <input />
                    </div>
                    <button
                        type='button'
                        onClick={() => {
                            console.log(details)
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