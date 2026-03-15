import * as React from 'react'
import { Link } from 'react-router-dom'
import home from '../images/home.jpg'

export default function Home() {
    return (
        <section className="text-body flex justify-center items-center pt-4 md:pt-32">
            <img className='image-round border-2 border-black' src={home} alt="Image" />
            <div className='inline-flex flex-col p-2 w-48 md:w-96'>
                <h6 className="mb-1 md:mb-2 text-title">Tamir Amitai</h6>
                <h1 className="mb-2 md:mb-4">Senior Quality Assurance Engineer</h1>
                <p className="mb-1 md:mb-2">
                    I have a passion for electronics. I enjoy building, whether that's on a screen or on a board.
                </p>
                <div className='inline-flex'>
                    <Link to='/about' className='button-primary mr-2 md:mr-4'>About</Link>
                    <Link to='/contact' className='button-primary mr-2 md:mr-4'>Contact</Link>
                </div>
            </div>
        </section>
    )
}
