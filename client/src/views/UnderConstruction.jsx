import React from 'react'
import {Link} from 'react-router-dom'
import { BsFillHouseDoorFill } from 'react-icons/bs';

export default function UnderConstruction() {
    return (
        <div className=''>
            <h1 className=''>
                This page is currently under construction.
            </h1>
            <p className=''>
                Please come back later.
            </p>
            <div className=''>
              <Link
                  to='/'
                  className=''
              >
                <BsFillHouseDoorFill />
              </Link>
            </div>
        </div>
    )
  }