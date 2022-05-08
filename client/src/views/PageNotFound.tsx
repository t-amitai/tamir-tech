import React from 'react'

function PageNotFound() {
    const page = window.location.href.split('/').pop()

    return(
        <>
            <h1>404 Error: Page not found</h1>
            <h3>The page you requested does not exist.</h3>
            <h3>Page: {page}</h3>
        </>
    )
}

export {PageNotFound}