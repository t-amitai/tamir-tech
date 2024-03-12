import React from 'react'
import backcountry from '../images/backcountry.jpg'

export default function About() {
    return (
        <section className="text-primary flex justify-center items-start pt-1 md:pt-4">
            <div className='about-image mt-1 md:mt-2'>
                <img
                    src={backcountry}
                    alt={`Image backcountry`}
                    className='object-contain rounded-lg'
                />
            </div>
            <div className='inline-flex flex-col w-64 md:w-96 ml-1 md:ml-4'>
                <h1 className="mb-1 md:mb-2 text-title">
                    Hello!
                </h1>
                <p className="mb-1 md:mb-2">
                    My name is Tamir! I am a multidisciplinary engineer adept at building and deploying full-stack applications.
                </p>
                <p className="mb-1 md:mb-2">
                I graduated in 2018 with a BS in Electrical Engineering, then pivoted my career in 2021 by completing an intensive 
                software engineering immersive. Since then, I have worked as an SDET and am now transitioning to development roles.
                </p>
            </div>
        </section>
    )
}