import React from 'react'
import { Link } from 'react-router-dom'

const navigation = [
    {name:'About', link:'about'},
    {name:'Resume', link:'resume'},
    {name:'Projects', link:'project'},
]
export default function Header() {
    return (
        <nav>
            {navigation.map(nav => {
                    return (
                        <Link className="m-2" to={nav.link}> {nav.name} </Link>
                    )
                }
            )}
        </nav>
    )
}