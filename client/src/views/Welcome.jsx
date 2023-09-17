import React from 'react'
import slateLake from "../images/slateLake.jpg";

export default function Welcome() {
    return(
        <div
            className="min-h-screen bg-cover bg-bottom"
            style={{
                backgroundImage: `url(${slateLake})`,
            }}
        ></div>
    )
}