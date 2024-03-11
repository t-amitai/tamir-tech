import React, {useState} from 'react'
import mountain1 from '../images/mountain1.jpg'
import mountain2 from '../images/mountain2.jpg'
import mountain3 from '../images/mountain3.jpg'
import lake1 from '../images/lake1.jpg'
import lake2 from '../images/lake2.jpg'
import slateLake from '../images/slateLake.jpg'
import { SlArrowLeft, SlArrowRight } from "react-icons/sl"


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
        <div className='relative inline-flex h-full w-full justify-center items-center text-white text-2xl font-bold'>
            <div className='relative md:p-2 carousel-image'>
                <img
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex}`}
                    className=' object-contain rounded-lg'
                />
                <button
                    className='absolute inset-y-0 left-4'
                    onClick={prevSlide}
                >
                    <SlArrowLeft />
                </button>
                <button
                    className='absolute inset-y-0 right-4'
                    onClick={nextSlide}
                >
                    <SlArrowRight />
                </button>
            </div>
        </div>
    );
};

export default function Interests() {
    return(
        <div className='h-full flex flex-col justify-start text-center text-primary'>
            <p className='mt-2 md:mt-4'>
                Based out of colorful Colorado, I fill my days outside of coding...outside!<br></br>
                Some pictures I have taken:
            </p>
            <div className='grow'>
                <ImageCarousel images={images} />
            </div>
        </div>
    )
}
