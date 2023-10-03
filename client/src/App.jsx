import React, {useState, useEffect} from 'react'
import {HashRouter, Routes, Route} from 'react-router-dom'
import Home from './views/Home'
import About from './views/About'
import Resume from './views/Resume'
import Welcome from './views/Welcome'
import UnderConstruction from './views/UnderConstruction'
import Header from './components/Header'
import PageNotFound from './views/PageNotFound'
import Footer from './components/Footer'

const App = function(){
    const [welcome, setWelcome] = useState(false)

    /* Welcome animation */
    useEffect(() => {
        if (welcome) {
            const url = new URL(window.location.href)
            window.location.replace(url.origin + '#/welcome')
            setWelcome(false)
        }
    }, [])

    return (
        <HashRouter>
        <div
            className="min-h-screen bg-gradient-to-b from-cyan-400 to-teal-400 flex flex-col justify-between"
        >
            <header className="">
                <Header />
            </header>
            <main className="">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="welcome" element={<Welcome />} />
                    <Route path="about" element={<About />} />
                    <Route path="resume" element={<Resume />} />
                    <Route path="projects" element={<UnderConstruction />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </main>
            <footer className="">
                <Footer />
            </footer>
        </div>
        </HashRouter>
    )
}

export {App}