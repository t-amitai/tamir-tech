import React from 'react'
import slateLake from "../images/slateLake.jpg";
import {Link} from "react-router-dom";
import {BsFillHouseDoorFill} from "react-icons/bs";

export default function Welcome() {
    return(
        <div
            className='fixed top-0 left-0 h-screen w-screen bg-cover text-2xl lg:text-4xl
            flex flex-col items-center justify-center'
            style={{
                backgroundImage: `url(${slateLake})`,
            }}
        >
            <h1 className='mb-5 lg:mb-10 font-bold text-black'>
                Welcome
            </h1>
            <Link
                to='/'
            >
                <BsFillHouseDoorFill />
            </Link>
        </div>
    )
}

export function welcomeAnimation(){
    console.log('welcome animation!')
}