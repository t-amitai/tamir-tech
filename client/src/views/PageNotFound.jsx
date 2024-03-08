import React from 'react'
import slateLake from '../images/slateLake.jpg'
import {Link} from 'react-router-dom';
import {BsFillHouseDoorFill} from "react-icons/bs";

export default function PageNotFound() {
    return (
        <div className='h-full flex flex-col justify-center items-center text-center text-primary'>
            <p className=''>404</p>
            <p className='text-header'>Uh oh! I think you’re lost.</p>
            <p className=''>
              The page you’re looking for doesn't exist.
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