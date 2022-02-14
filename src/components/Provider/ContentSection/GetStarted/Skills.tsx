
/*

Multi Service Platform - Provider Get Started Skills Content
Created: Feb. 12, 2022
Last Updated: Feb. 14, 2022
Author: Tolentino, Francis James S.

*/



import React, { useState } from 'react';
import { useAuthentication } from '../../../../custom-hooks/useAuthentication';
import useClickOutsideElement from '../../../../custom-hooks/useClickOutsideElement';
import useSplitArray from '../../../../custom-hooks/useSplitArray';




const Skills: React.FC = () => {

    const [activeLi, setActiveLi] = useState<{skill: string, idx: number} | null>(null);
    const [skill, setSkill] = useState<string>('');
    const { session, setSession } = useAuthentication();


    const skillsULRef = useClickOutsideElement(() => setActiveLi(null));



    const skills = useSplitArray({
        stringToSplit: session?.skills ? session?.skills as string : '',
        splitter: '|',
        dependencies: [session],
    });
    


    const addNewSkill = (e: any) => {
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
    }



    const sliceConcatString = ({string, substring, index} : any) => {
        const left = string.slice(0, index);
        const right = string.slice(index+(substring.length + 2), string.length);

        // console.log(left + right);
        return left + right;
    }



    const removeSkill = () => {
        if (typeof setSession === 'function' && activeLi?.skill) {
            setSession(prev => {
                const index = prev?.skills?.indexOf(activeLi.skill);

                if (prev?.skills){
                    prev = {
                        ...prev,
                        skills: sliceConcatString({
                            string: prev.skills,
                            substring: activeLi.skill,
                            index: index,
                        }),
                    }
                    return prev;
                }

                return prev;
            })
        }
    }



    return (
        <div className='get-started-content-container'>


            <form onSubmit={addNewSkill}>
                <div style={{display:'flex'}}>
                    <div style={{width: '80%',}}>
                        <input 
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                            className='form-control'
                            placeholder='Plumbing, Laundry, etc.'
                            />
                    </div>
                    <div 
                        style={{
                            width: '20%',
                            display: 'flex'
                        }}
                    >
                        <button
                            type='submit'
                            onSubmit={addNewSkill}
                            >
                            Add
                        </button> 
                        <button
                            type='button'
                            onClick={removeSkill}
                            disabled={!activeLi ? true : false}
                        >
                            Remove Skill
                        </button>
                    </div>
                </div>
            </form>
            

            <ul 
                ref={skillsULRef}
                className='skills-ul' 
                style={{margin: '1em 0 0 0'}}
            >
                {
                    skills && skills.map((skill, idx) => {
                        if (!skill || skill === '') return <React.Fragment key={idx}></React.Fragment>
                        return (
                            <li 
                                key={idx} 
                                className={activeLi?.idx === idx ? 'skills-active-li' : 'skills-li'}
                                onClick={() => setActiveLi({
                                    idx: idx, 
                                    skill: skill
                                })}
                            >
                                {skill}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}



export default Skills;