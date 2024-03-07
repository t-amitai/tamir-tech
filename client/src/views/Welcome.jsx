import React from 'react'
import slateLake from "../images/slateLake.jpg";
import {Link} from "react-router-dom";
import {BsFillHouseDoorFill} from "react-icons/bs";

export default function Welcome() {
    return(
        <div
            className=''
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
