import React from 'react'
import slateLake from "../images/slateLake.jpg";
import {Link} from "react-router-dom";
import {BsFillHouseDoorFill} from "react-icons/bs";

export default function Welcome({setWelcome}) {

    function setCookie() {
        const timestamp = new Date()
        const expireTimestamp = new Date(timestamp.getTime() + 1 * 24 * 60 * 60 * 1000)
        document.cookie = `welcome=${timestamp.toUTCString()};expires=${expireTimestamp.toUTCString()}`
    }

    const handleClick = (e) => {
        setWelcome(false)
        setCookie()
    }

    return(
        <div
            className='fixed top-0 left-0 h-screen w-screen bg-cover 
                flex flex-col items-center justify-center text-title'
            style={{
                backgroundImage: `url(${slateLake})`,
            }}
        >
            <h1>Welcome</h1>
            <Link
                onClick={handleClick}
                to='/'
            > <BsFillHouseDoorFill /> </Link>
        </div>
    )
}
