import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TbHexagonLetterT } from "react-icons/tb";
import { TbMenu2 } from "react-icons/tb"

const navigation= [
    {name:'About', link:'/about'},
    {name:'Resume', link:'/resume'},
    {name:'Projects', link:'/projects'},
]

function HeaderButton({nav}) {
    return (
        <button className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
            <Link to={nav.link}>
                {nav.name}
            </Link>
        </button>
    );
}


export default function Header() {
    const [isOpen, setOpen] = useState(false)
    return (
    <nav className="bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white"><TbHexagonLetterT /></span>
            </Link>
            <button
                className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => {setOpen(!isOpen)}}
            >
                <span className="sr-only">Open main menu</span>
                <span aria-hidden="true">
                    <TbMenu2 />
                </span>
            </button>
            <div className={`${!isOpen?'hidden':''} w-screen md:block md:w-auto`} id="navbar-default">
                <ul className="font-medium flex flex-col items-center justify-center p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white bg-gray-800 md:dark:bg-gray-900">
                    {navigation.map(nav => (
                        <li key={nav.link} onClick={()=>{setOpen(false)}}>
                            <HeaderButton nav={nav} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
    </nav>

    )
}

