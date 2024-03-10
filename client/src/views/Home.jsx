import * as React from 'react'
import home from '../images/home.png'

export default function Home() {
    return (
        <section className="main-content text-center">
            <div className="flex justify-center mb-16">
                <img className='image-round' src={home} alt="Image" />
            </div>
            <h6 className="text-header mb-8">Tamir Amitai</h6>
            <h1 className="text-title mb-8">Software Engineer</h1>
            <p className="text-primary mb-16">I have a passion for electronics. I enjoy building, whether that's on a screen or on a board.</p>
        </section>
    )
}
