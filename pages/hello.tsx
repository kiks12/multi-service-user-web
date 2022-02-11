

import type { NextPage } from "next";



import { motion } from 'framer-motion';
import React from "react";
import Image from "next/image";




const Pix : React.FC<any> = ({src}) => {
    return (
        <div style={{
            borderRadius: '3em',
            overflow: 'hidden',
            margin: '1em 0 ',
            height: '70vh',
            width: '70vh',
            cursor: 'pointer'
        }}
        >
            <Image src={src} alt='asfasf' height={500} width={500} objectFit='cover'/>
        </div>
    )
};


const Hello: NextPage = () => {
    return (
        <>
        <motion.main 
            animate={{
                y: [10, 0]
            }}
            style={{
                display: "flex",
                height: '100vh',
                width: '100vw',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'var(--mainPurple)'
            }}
        >
            <h1>Happy Monthsary</h1>
            <h1>Happy Valentines Day</h1>
            <small>Hover on each pix</small>
            <motion.div 
                layout 
                animate={{
                    y: 10,
                }}
            >

                <div>
                    <motion.div 
                        layout
                        whileHover={{
                            x: -200
                        }}
                        className="container"
                    >
                        <Pix src='/1.jpg'/>
                        <motion.div>
                            <p className="text">Hello I love you very much ganda hehe</p>
                        </motion.div>
                    </motion.div>

                </div>
            </motion.div>
        </motion.main>


        <motion.main 
            animate={{
                y: [10, 0]
            }}
            style={{
                display: "flex",
                height: '100vh',
                width: '100vw',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white'
            }}
        >
            <motion.div 
                layout 
                animate={{
                    y: 10,
                }}
            >

                <div>

                    <motion.div 
                        layout
                        whileHover={{
                            x: 200
                        }}
                        className="container"
                    >
                        <motion.div>
                            <p className="text2">
                                I miss you so much hehe wag ka na busangot dyan sorry din kagabi nabusit ako baka kase mabunggo ka 
                            </p>
                        </motion.div>
                        <Pix src='/2.jpg'/>
                    </motion.div>

                </div>
            </motion.div>
        </motion.main>

        
        <motion.main 
            animate={{
                y: [10, 0]
            }}
            style={{
                display: "flex",
                height: '100vh',
                width: '100vw',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#BD4B44'
            }}
        >
            <motion.div 
                layout 
                animate={{
                    y: 10,
                }}
            >

                <div>

                    <motion.div 
                        layout
                        whileHover={{
                            x: -200
                        }}
                        className="container"
                    >
                        <Pix src='/3.jpg'/>
                        <motion.div>
                            <p className="text">
                                Tapusin mo na yang mga ginagawa mo aalis tayo sa 19 HAHAHAHAHAA
                            </p>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        layout
                        whileHover={{
                            x: 200
                        }}
                        className="container"
                    >
                        <motion.div>
                            <p className="text2">
                                Thank you for everything inside and out i love you so much umiyak ka sana minsan lang to nagcode pako para sayo nasa main codebase pa to ng app ko loko HAHAHHAHAHAAHA
                            </p>
                        </motion.div>
                        <Pix src='/4.jpg'/>
                    </motion.div>

                    <motion.div 
                        layout
                        whileHover={{
                            x: -200
                        }}
                        className="container"
                    >
                        <Pix src='/5.jpg'/>
                        <motion.div>
                            <p className="text">
                                {'I love you very much wag ka na magbago mahal na kita dyan ka lang habang nasstress ako dito araw araw. I appreciate you so much bubba/ungi/miraboo <33'}
                            </p>
                        </motion.div>
                    </motion.div>

                </div>
            </motion.div>
        </motion.main>
        </>
    )
}



export default Hello;