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
                        className='button-primary text-header'
                    >{nav.name}</button>
                :
                    <button
                        className='h-12 w-12 xl:h-20 xl:w-20 rounded-full bg-cover bg-center'
                        style={{backgroundImage:`url(${iconPic})`}}
                    />
            } </Link>
    );
}

export default function Header() {
    return (
        <ul className='flex flex-row justify-start items-center'>
            {navigation.map(nav => (
                <li key={nav.link} className='m-2'>
                    <HeaderButton nav={nav} />
                </li>
            ))}
        </ul>
    )
}

