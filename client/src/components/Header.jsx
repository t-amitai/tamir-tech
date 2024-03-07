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
                        className=""
                    >{nav.name}</button>
                :
                    <button
                        className=""
                        style={{backgroundImage:`url(${iconPic})`}}
                    />
            } </Link>
    );
}

export default function Header() {
    return (
        <nav>
            <ul className="">
                {navigation.map(nav => (
                    <li key={nav.link}>
                        <HeaderButton nav={nav} />
                    </li>
                ))}
            </ul>
        </nav>
    )
}

