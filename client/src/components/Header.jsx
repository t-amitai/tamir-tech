import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TbHexagonLetterT } from "react-icons/tb"
import { TbMenu2 } from "react-icons/tb"

const navigation= [
    {name:'About', link:'/about'},
    {name:'Resume', link:'/resume'},
    {name:'Interests', link:'/interests'},
]

function HeaderButton({nav}) {
    return (
        <button className="hover:text-gray-700">
            <Link to={nav.link}>
                {nav.name}
            </Link>
        </button>
    );
}


export default function Header() {
    const [isOpen, setOpen] = useState(false)
    return (
    <nav className="text-secondary">
        <div className="max-w-screen-lg flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/" className="flex items-center space-x-3 text-white">
                <span className="text-2xl font-semibold whitespace-nowrap" onClick={()=>{setOpen(false)}} >
                    <TbHexagonLetterT />
                </span>
            </Link>
            <button
                className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm rounded-lg md:hidden"
                onClick={() => {setOpen(!isOpen)}}
            >
                <span className="sr-only">Open main menu</span>
                <span>
                    <TbMenu2 />
                </span>
            </button>
            <div className={`${!isOpen?'hidden':''} w-screen md:block md:w-auto`} >
                <ul className="flex flex-col items-center justify-center p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
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

