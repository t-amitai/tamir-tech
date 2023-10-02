import React from 'react'
import {Link} from 'react-router-dom'
import { BsFillHouseDoorFill } from 'react-icons/bs';

export default function UnderConstruction() {
    return (
        <div className='text-lg lg:text-xl 2xl:text-4xl mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48'>
            <h1 className='mt-2 font-bold tracking-tight text-black '>
                This page is currently under construction.
            </h1>
            <p className='mt-2  font-medium text-black text-opacity-50'>
                Please come back later.
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