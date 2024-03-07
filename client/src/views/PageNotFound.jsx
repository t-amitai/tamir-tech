import React from 'react'
import slateLake from '../images/slateLake.jpg'
import {Link} from 'react-router-dom';
import {BsFillHouseDoorFill} from "react-icons/bs";

export default function PageNotFound() {
    return (
        <div className=''>
            <p className=''>404</p>
            <h1 className=''>Uh oh! I think you’re lost.</h1>
            <p className=''>
              It looks like the page you’re looking for doesn't exist.
            </p>
            <div className=''>
                <Link
                    to='/'
                    className='inline-flex items-center'
                >
                    <BsFillHouseDoorFill />
                </Link>
            </div>
        </div>
    )
  }