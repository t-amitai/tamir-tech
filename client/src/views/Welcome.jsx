import React from 'react'
import slateLake from "../images/slateLake.jpg";
import {Link} from "react-router-dom";
import {BsFillHouseDoorFill} from "react-icons/bs";

export default function Welcome() {
    return(
        <div
            className='fixed top-0 left-0 h-screen w-screen bg-cover 
                flex flex-col items-center justify-center text-title'
            style={{
                backgroundImage: `url(${slateLake})`,
            }}
        >
            <h1 className=''>
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
