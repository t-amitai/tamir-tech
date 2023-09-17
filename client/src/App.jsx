import React from 'react'
import { HashRouter, Route, Routes, Link } from 'react-router-dom'
import { Home } from './views/Home'
import { About } from './views/About'
import { Resume } from './views/Resume'
import { Welcome } from './views/Welcome'
import Header from './components/Header'
import PageNotFound from './views/PageNotFound'
import Copyright from './components/Copyright'

const App = function(){
    return (
        <>
            <HashRouter>
                <header className="">
                    <Header />
                </header>
                <main className="">
                    <Routes>
                        <Route path="/" element=<Home /> />
                        <Route path="welcome" element=<Welcome /> />
                        <Route path="about" element=<About /> />
                        <Route path="resume" element=<Resume /> />
                        <Route path="*" element=<PageNotFound /> />
                    </Routes>
                </main>
                <footer className="">
                    <Copyright/>
                </footer>
            </HashRouter>
        </>
    )      
}

export {App}