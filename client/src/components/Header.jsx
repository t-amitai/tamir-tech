import React from 'react'
import { Link } from 'react-router-dom'
import iconPic from '../images/iconPic.jpg'

const navigation= [
    {name:'Home', link:'/'},
    {name:'About', link:'/about'},
    {name:'Resume', link:'/resume'},
    {name:'Projects', link:'/projects'},
]

function HeaderButton({nav}) {
    return (
            <Link to={nav.link}> {
                nav.name !== 'Home' ?
                    <button
                        className="m-2 xl:m-4 p-1 xl:p-4 bg-gradient-to-r from-gray-400 to-white rounded-lg hover:text-blue-800"
                    >{nav.name}</button>
                :
                    <button
                        className="m-2 h-12 w-12 xl:h-20 xl:w-20 rounded-full bg-cover bg-center"
                        style={{backgroundImage:`url(${iconPic})`}}
                    />
            } </Link>
    );
}

export default function Header() {
    return (
        <nav>
            <ul className="flex flex-row items-center text-sm lg:text-lg ">
                {navigation.map(nav => (
                    <li key={nav.link}>
                        <HeaderButton nav={nav} />
                    </li>
                ))}
            </ul>
        </nav>
    )
}

