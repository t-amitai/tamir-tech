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

function HeaderButton({nav}) {
    if (nav.link === 'home') {
        return (
            <Link to={nav.link} key={nav.link}>
                <button
                    className="m-1 lg:m-2 xl:m-4 lg:mx-3 xl:mx-5 inline-flex items-center justify-center p-0.5 text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                            <span
                                className="px-2 py-1 lg:px-4 lg:py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                            >{nav.name}</span>
                </button>
            </Link>
        );
    }
    return (
        <Link to={nav.link} key={nav.link}>
            <button
                className="m-1 lg:m-2 xl:m-4 lg:mx-3 xl:mx-5 inline-flex items-center justify-center p-0.5 text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
                            <span
                                className="px-2 py-1 lg:px-4 lg:py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                            >{nav.name}</span>
            </button>
        </Link>
    );

}
export default function Header() {
    return (
        <nav>
            {navigation.map(nav => <HeaderButton nav={nav} />)}
        </nav>
    )
}

