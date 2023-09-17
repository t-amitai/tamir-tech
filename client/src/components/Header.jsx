import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({navigation}) {
    return (
        <nav>
            {navigation.map(nav => {
                    return (
                        <Link
                            className="m-2 lg:m-4"
                            to={nav.link}
                            key={nav.link}
                        > {nav.name} </Link>
                    )
                }
            )}
        </nav>
    )
}