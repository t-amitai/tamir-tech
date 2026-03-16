import React from 'react'
import backcountry from '../images/backcountry.jpg'

export default function About() {
    return (
        <section className="text-body flex flex-wrap justify-center items-start gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6 md:pt-8 px-4">
            <div className='about-image mt-1 sm:mt-2'>
                <img
                    src={backcountry}
                    alt={`Image backcountry`}
                    className='object-contain rounded-lg'
                />
            </div>
            <div className='flex flex-col w-64 sm:w-80 md:w-96'>
                <p className="mb-2 sm:mb-3 md:mb-4">
                    My name is Tamir! I am a multidisciplinary engineer adept at building and deploying full-stack applications.
                </p>
                <p className="mb-2 sm:mb-3 md:mb-4">
                I graduated in 2018 with a B.S. in Electrical and Electronics Engineering, then pivoted my career in 2021 by completing an intensive
                software engineering immersive. Since then, I have worked as an Automation Engineer, where I have grown a passion for Quality Assurance and building reliable test systems.
                </p>
            </div>
        </section>
    )
}