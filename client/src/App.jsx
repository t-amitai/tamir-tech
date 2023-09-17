import React from 'react'
import { HashRouter, Route, Routes, Link } from 'react-router-dom'
import Home from './views/Home'
import About from './views/About'
import Resume from './views/Resume'
import Welcome from './views/Welcome'
import UnderConstruction from './views/UnderConstruction'
import Header from './components/Header'
import PageNotFound from './views/PageNotFound'
import Copyright from './components/Copyright'

const App = function(){
    return (
        <HashRouter>
            <header className="h-300 text-xl lg:text-2xl">
                <Header />
            </header>
            <main className="min-h-full lg:text-2xl">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="welcome" element={<Welcome />} />
                    <Route path="about" element={<About />} />
                    <Route path="resume" element={<Resume />} />
                    <Route path="projects" element={<UnderConstruction />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </main>
            <footer className="sticky bottom-0 lg:text-4xl">
                <Copyright/>
            </footer>
        </HashRouter>
    )      
}

export {App}