import React from 'react'
import {Link} from 'react-router-dom'

function NavBar() {
    return (
        <div>
            <div>
                Tamir Amitai
            </div>
            <Link to="/">
                Home
            </Link>
            <Link to="/projects">
                About
            </Link>
            <Link to="/resume">
            	Resume
            </Link>
        </div>
    )
}

export {NavBar}
