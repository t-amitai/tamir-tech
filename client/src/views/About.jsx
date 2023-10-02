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
        <div className="relative">
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-full"
                onClick={prevSlide}
            >
                &lt;
            </button>
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-full"
                onClick={nextSlide}
            >
                &gt;
            </button>
            <div className="mx-auto w-auto md:w-2/3 2xl:w-full">
                <img
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex}`}
                    className="w-full rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
};

export default function About() {
    return(
        <div className='h-full text-base lg:text-lg 2xl:text-xl mx-auto mb-5 max-w-7xl px-4 sm:px-6 lg:px-8 flex-col justify-between text-center'>
            <p className='text-lg lg:text-xl 2xl:text-2xl font-bold text-black'>About me</p>
            <p className='mt-2 font-medium text-black'>
                Based out of colorful Colorado, I fill my days outside of coding...outside!
            </p>
            <p className='mt-2 font-medium text-black text-opacity-50'>
                Some pictures I have taken:
            </p>
            <ImageCarousel images={images} />
        </div>
    )
}
