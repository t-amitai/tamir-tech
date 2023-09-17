import React from 'react'
import { HashRouter, Route, Routes, Link } from 'react-router-dom'
import { Home } from './views/Home'
import { About } from './views/About'
import { Resume } from './views/Resume'
import Header from './components/Header'
import PageNotFound from './views/PageNotFound'
import Copyright from './components/Copyright'

const navigation = [
    { name: 'About', href: '#/About' },
    { name: 'Resume', href: '#/Resume' },
]

const App = function(){
    return (
        <>
            <HashRouter>
                <header className="bg-gray-600">
                    <Header navigation={navigation}/>
                </header>
                <main className="bg-gray-600 min-h-fit">
                    <Routes>
                        <Route path="/" element= {<Home />} key='Home'/>
                        <Route path={"About"} element={<About />} key={"About"} />
                        <Route path={"Resume"} element={<Resume />} key={"Resume"} />
                        <Route path="*" element={<PageNotFound />} key='PageNotFound' />
                    </Routes>
                </main>
                <footer className="bg-gray-600 ">
                    <Copyright/>
                </footer>
            </HashRouter>
        </>
    )      
}

export {App}