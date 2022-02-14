
/*

Multi Service Platform - Provider Get Started Skills Content
Created: Feb. 12, 2022
Last Updated: Feb. 12, 2022
Author: Tolentino, Francis James S.

*/



import React, { useEffect, useMemo, useState } from 'react';
import { useAuthentication } from '../../../../custom-hooks/useAuthentication';



const Skills: React.FC = () => {

    const [skill, setSkill] = useState<string>('');
    const { session, setSession } = useAuthentication();


    const skills = useMemo(() => {
        return session?.skills?.split("|");
    }, [session]);


    useEffect(() => {
        console.log(session?.skills);
    }, [session]);


    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (typeof setSession === 'function') {
                    if(session?.skills){
                        setSession((prev: any) => {
                            prev = {
                                ...prev,
                                skills: prev.skills + ` ${skill} |`
                            }
                            return prev;
                        })
                    } else {
                        setSession((prev: any) => {
                            prev = {
                                ...prev, 
                                skills: `${skill} |`
                            }
                            return prev;
                        })
                    }
                }
                setSkill('');
            }}>
                <input 
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    className='form-control'
                />
            </form>

            <ul>
                {
                    skills && skills.map((skill) => {
                        if (!skill) return <React.Fragment key={skill}></React.Fragment>
                        return <li key={skill}>{skill}</li>
                    })
                }
            </ul>
        </div>
    )
}



export default Skills;