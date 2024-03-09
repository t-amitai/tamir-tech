import React from 'react'

export default function Space () {
    return (
        <div 
            className='h-full w-full background-stars flex flex-row justify-between items-center'
        >
            <div className='planet bg-gradient-to-b from-orange-300 to-orange-700 ring-1 ring-opacity-50 ring-orange'>

            </div>
            <div className='planet bg-gradient-to-t from-blue-300 to-blue-700 ring-1 ring-opacity-10 ring-blue'>

            </div>
            <div></div>
            <div></div>
            <div></div>
            <div className='planet bg-gradient-to-l from-green-300 to-green-700 ring-1 ring-opacity-10 ring-green'>

            </div>
        </div>
    )
}