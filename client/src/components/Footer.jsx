import React from 'react'
import {BiLogoGithub} from 'react-icons/bi'
import {BiLogoLinkedin} from "react-icons/bi";

const navigation = [
  {
    name: 'GitHub',
    href: 'https://www.github.com/t-amitai',
    icon: <BiLogoGithub/>
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tamir-amitai/',
    icon: <BiLogoLinkedin/>
  },
]

export default function Footer() {
  return (
    <div className="">
      <div className="">
        {navigation.map(nav => (
          <a key={nav.name} href={nav.href} className="">
              {nav.icon}
          </a>
        ))}
      </div>
      <div className="">
        <p className="">
            &copy; {new Date().getFullYear()} Tamir Amitai. All rights reserved.
        </p>
      </div>
    </div>
  )
}

