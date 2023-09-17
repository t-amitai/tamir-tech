import React from 'react'
import { Link } from 'react-router-dom'
import iconPic from '../images/iconPic.jpg'
import slateLake from "../images/slateLake.jpg";

const navigation= [
        {name:'Home', link:'home'},
        {name:'About', link:'about'},
        {name:'Resume', link:'resume'},
        {name:'Projects', link:'project'},
]
export default function Header() {
    return (
        <nav>
            {navigation.map((nav, index) => {
                if (index === 0) {
                    return (
                        <Link
                            className="mx-2 my-2 lg:mx-4"
                            to={nav.link}
                            key={nav.link}
                        >
                            <div className="h-10bg-cover"
                                 style={{
                                     backgroundImage: `url(${iconPic})`,
                                 }}/>
                        </Link>
                    )
                }
                return (
                    <Link
                        className="m-2 lg:m-4 hover:text-slate-600"
                        to={nav.link}
                        key={nav.link}
                    > {nav.name} </Link>
                )}
            )}
        </nav>
    )
}