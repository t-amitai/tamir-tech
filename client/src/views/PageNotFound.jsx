import React from 'react'
import {Link} from 'react-router-dom';
import {BsFillHouseDoorFill} from "react-icons/bs";

export default function PageNotFound() {
    return (
        <div className='flex flex-col justify-center items-center text-center text-body'>
            <p>404</p>
            <p className='text-title'>Uh oh! I think you're lost.</p>
            <p>
              The page you're looking for doesn't exist.
            </p>
            <div>
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
