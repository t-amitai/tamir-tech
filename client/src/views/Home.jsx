import * as React from 'react'

export default function Home() {
    return (
        <div className='text-lg lg:text-xl mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48'>
            <p className='font-bold text-black'>Hi, I'm Tamir!</p>
            <h1 className='text-xl lg:text-2xl mt-2 tracking-tight text-black'>A Software Engineer working in QA. </h1>
            <p className='mt-2 font-medium text-black text-opacity-50'>
                I'm using this website to showcase my skills.
            </p>
            <p className='mt-2 font-medium text-black text-opacity-50'>
                Some features rely on a server, which may or may not be running.
            </p>
            <p className='mt-2 font-medium text-black'>
                Please enjoy
            </p>
        </div>
    )
}
