import React from 'react'

function PageNotFound() {
    const page = window.location.href.split('/').pop()

    return(
        <>
            <h1>404 Error: Page not found</h1>
            <h5>The page you requested does not exist.</h5>
            <h5>Page: {page}</h5>
        </>
    )
}

export {PageNotFound}