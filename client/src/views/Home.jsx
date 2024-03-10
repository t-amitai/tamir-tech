import * as React from 'react'
import home from '../images/home.jpg'

export default function Home() {
    return (
        <section className="text-white text-xs md:text-base flex justify-center items-center pt-4 md:pt-32">
            <img className='image-round border-2 border-black' src={home} alt="Image" />
            <div className='inline-flex flex-col p-2 w-48 md:w-80'>
                <h6 className="mb-1 md:mb-2 text-xl md:text-2xl">Tamir Amitai</h6>
                <h1 className="mb-2 md:mb-4">Software Engineer - Level 3</h1>
                <p className="">
                    I have a passion for electronics. I enjoy building, whether that's on a screen or on a board.
                </p>
            </div>
        </section>
    )
}
