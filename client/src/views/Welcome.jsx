import React from 'react'
import slateLake from "../images/slateLake.jpg";

export default function Welcome() {
    return(
        <div
            className=""
            style={{
                backgroundImage: `url(${slateLake})`,
            }}
        >Welcome</div>
    )
}

export function welcomeAnimation(){
    console.log('welcome animation!')
}