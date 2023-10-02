import React from 'react'
import slateLake from '../images/slateLake.jpg'
import {Link} from 'react-router-dom';
import {BsFillHouseDoorFill} from "react-icons/bs";

export default function PageNotFound() {
    return (
        <div className='mx-auto text-lg lg:text-xl 2xl:text-4xl max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48'>
            <p className='font-semibold text-black text-opacity-50'>404</p>
            <h1 className='mt-2 font-bold tracking-tight text-white '>Uh oh! I think you’re lost.</h1>
            <p className='mt-2 font-medium text-black text-opacity-50'>
              It looks like the page you’re looking for doesn't exist.
            </p>
            <div className='mt-6'>
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