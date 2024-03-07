import React, {useState} from 'react'
import mountain1 from '../images/mountain1.jpg'
import mountain2 from '../images/mountain2.jpg'
import mountain3 from '../images/mountain3.jpg'
import mountain4 from '../images/mountain4.jpg'
import lake1 from '../images/lake1.jpg'
import lake2 from '../images/lake2.jpg'
import slateLake from '../images/slateLake.jpg'

const images = [mountain1,slateLake,mountain2,lake1,mountain3,lake2,mountain4]
const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % images.length)
    }

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length)
    }

    return (
        <div className=''>
            <button
                className=''
                onClick={prevSlide}
            >
                &lt;
            </button>
            <button
                className=''
                onClick={nextSlide}
            >
                &gt;
            </button>
            <div className=''>
                <img
                    className=''
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex}`}
                />
            </div>
        </div>
    );
};

export default function About() {
    return(
        <div className=''>
            <p className=''>About me</p>
            <p className=''>
                Based out of colorful Colorado, I fill my days outside of coding...outside!
            </p>
            <p className=''>
                Some pictures I have taken:
            </p>
            <ImageCarousel images={images} />
        </div>
    )
}
