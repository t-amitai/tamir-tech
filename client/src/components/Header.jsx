import React from 'react'

const navigation = [
    { name: 'Solutions', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Docs', href: '#' },
    { name: 'Company', href: '#' },
]
  
export default function Header({navigation}) {
return (
    <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
        <div className="flex items-center">
          <a href="#">
            <span className="sr-only">Tamir Amitai</span>
            <img className="h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="Home" />
          </a>
          <div className="ml-10 hidden space-x-8 lg:block">
            {navigation.map((link) => (
              <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
        {navigation.map((link) => (
          <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
            {link.name}
          </a>
        ))}
      </div>
    </nav>
)
}