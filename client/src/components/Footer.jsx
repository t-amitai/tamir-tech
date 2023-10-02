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
    <div className="text-xl 2xl:text-6xl">
      <div className="flex justify-center space-x-6">
        {navigation.map(nav => (
          <a key={nav.name} href={nav.href} className="hover:text-gray-500">
              {nav.icon}
          </a>
        ))}
      </div>
      <div className="mt-8 md:mt-0">
        <p className="text-center">
            &copy; {new Date().getFullYear()} Tamir Amitai. All rights reserved.
        </p>
      </div>
    </div>
  )
}

