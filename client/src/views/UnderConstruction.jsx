import React from 'react'
import { BsFillHouseDoorFill } from 'react-icons/bs';

export default function UnderConstruction() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-black sm:text-5xl">This page is currently under construction.</h1>
            <p className="mt-2 text-lg font-medium text-black text-opacity-50">
              Please come back later.
            </p>
            <div className="mt-6">
              <a
                href="#"
                className="inline-flex items-center"
              >
                <BsFillHouseDoorFill />
              </a>
            </div>
        </div>
    )
  }