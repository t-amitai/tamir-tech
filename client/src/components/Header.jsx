import React from 'react'
import { Link } from 'react-router-dom'
  
export default function Header() {
return (
    <nav>
        <Link to='about'>About</Link>
        <Link to='resume'>Resume</Link>
    </nav>
)
}