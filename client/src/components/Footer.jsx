import React from 'react'
import {BiLogoGithub} from 'react-icons/bi'
import {BiLogoLinkedin} from 'react-icons/bi';

const navigation = [
  {
    name: 'GitHub',
    href: 'https://github.com/t-amitai/tamir-tech',
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
    <div className='text-primary text-center'>
      <div className='flex flex-row justify-center space-x-3 xl:space-x-6'>
        {navigation.map(nav => (
          <a key={nav.name} href={nav.href} className='hover:text-gray-500'>
              {nav.icon}
          </a>
        ))}
      </div>
      <div className=''>
        <p className=''>
            &copy; {new Date().getFullYear()} Tamir Amitai. All rights reserved.
        </p>
      </div>
    </div>
  )
}

