import React, {useEffect} from 'react'
import {Link} from "react-router-dom";
import {BsFillHouseDoorFill} from "react-icons/bs";

export default function Welcome({setWelcome}) {

    function setCookie() {
        const timestamp = new Date()
        const expireTimestamp = new Date(timestamp.getTime() + 1 * 24 * 60 * 60 * 1000)
        document.cookie = `welcome=${timestamp.toUTCString()};expires=${expireTimestamp.toUTCString()}`
    }

    const endWelcome = () => {
        setWelcome(false)
        setCookie()
    }

    useEffect(() => {
        setTimeout(endWelcome, 2000)
    }, [])

    return(
        <div
            className='text-center'
        >
            <h1 className='text-title'>Welcome</h1>
        </div>
    )
}
