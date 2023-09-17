import * as React from 'react'
import slateLake from '../images/slateLake.jpg'

function Home() {
    return (
        <>
            <main
          className="min-h-screen bg-cover bg-bottom"
          style={{
            backgroundImage: `url(${slateLake})`,
          }}
        ></main>
        </>
    )
}

export {Home}