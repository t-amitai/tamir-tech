import * as React from 'react'
import { Link } from 'react-router-dom'
import home from '../images/home.jpg'

export default function Home() {
    return (
        <section className="text-body flex flex-wrap justify-center items-center gap-4 pt-8 sm:pt-16 md:pt-32 px-4">
            <img className='image-round border-2 border-black' src={home} alt="Image" />
            <div className='flex flex-col w-48 sm:w-72 md:w-96'>
                <h6 className="mb-1 sm:mb-2 text-title">Tamir Amitai</h6>
                <h1 className="mb-2 sm:mb-3 md:mb-4">Senior Quality Assurance Engineer</h1>
                <p className="mb-2 sm:mb-3 md:mb-4">
                    I have a passion for electronics. I enjoy building, whether that's on a screen or on a board.
                </p>
                <div className='flex gap-2 sm:gap-3 md:gap-4'>
                    <Link to='/about' className='button-primary'>About</Link>
                    <Link to='/contact' className='button-primary'>Contact</Link>
                </div>
            </div>
        </section>
    )
}
