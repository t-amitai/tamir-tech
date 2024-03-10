import React, {useState} from 'react'
import mountain1 from '../images/mountain1.jpg'
import mountain2 from '../images/mountain2.jpg'
import mountain3 from '../images/mountain3.jpg'
import lake1 from '../images/lake1.jpg'
import lake2 from '../images/lake2.jpg'
import slateLake from '../images/slateLake.jpg'

const images = [mountain1,slateLake,mountain2,lake1,mountain3,lake2]
const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % images.length)
    }

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length)
    }

    return (
        <div className='inline-flex h-full w-full justify-center items-center'>
            <button
                className='button-round'
                onClick={prevSlide}
            >
                &lt;
            </button>
            <div className='md:p-2 h-full w-full lg:w-1/2'>
                <img
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex}`}
                    className='object-contain rounded-lg'
                />
            </div>
            <button
                className='button-round'
                onClick={nextSlide}
            >
                &gt;
            </button>
        </div>
    );
};

export default function Interests() {
    return(
        <div className='h-full flex flex-col justify-start text-center text-primary'>
            <p className='text-title'>About me:</p>
            <p>
                Based out of colorful Colorado, I fill my days outside of coding...outside!<br></br>
                Some pictures I have taken:
            </p>
            <div className='grow'>
                <ImageCarousel images={images} />
            </div>
        </div>
    )
}
