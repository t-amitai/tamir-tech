import React from 'react'
import { Link } from 'react-router-dom'
import iconPic from '../images/iconPic.jpg'

const navigation= [
    {name:'Home', link:'home'},
    {name:'About', link:'about'},
    {name:'Resume', link:'resume'},
    {name:'Projects', link:'project'},
]

function HeaderButton({nav}) {
    return (
            <Link to={nav.link}> {
                nav.link !== 'home' ?
                    <button
                        className="m-2 xl:m-4 xl:p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:text-gray-600"
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
            <ul className="flex flex-row items-center ">
                {navigation.map(nav => (
                    <li key={nav.link}>
                        <HeaderButton nav={nav} />
                    </li>
                ))}
            </ul>
        </nav>
    )


}

