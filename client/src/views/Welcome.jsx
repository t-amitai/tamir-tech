import React from 'react'
import slateLake from "../images/slateLake.jpg";
import {Link} from "react-router-dom";
import {BsFillHouseDoorFill} from "react-icons/bs";

export default function Welcome() {
    return(
        <div
            className='fixed top-0 left-0 h-screen w-screen bg-cover flex flex-col items-center justify-center'
            style={{
                backgroundImage: `url(${slateLake})`,
            }}
        >
            <h1 className='mb-10 text-4xl font-bold text-black sm:text-5xl'>
                Welcome
            </h1>
            <Link
                to='/home'
            >
                <BsFillHouseDoorFill />
            </Link>
        </div>
    )
}

export function welcomeAnimation(){
    console.log('welcome animation!')
}