import React, {useEffect} from 'react'
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
    const [welcome, setWelcome] = React.useState(true)

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
            <header className="text-sm lg:text-lg 2xl:text-4xl">
                <Header />
            </header>
            <main className="text-lg 2xl:text-2xl">
                <Routes>
                    <Route path="welcome" element={<Welcome />} />
                    <Route path="home" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="resume" element={<Resume />} />
                    <Route path="projects" element={<UnderConstruction />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </main>
            <footer className="lg:text-4xl">
                <Footer />
            </footer>
        </div>
        </HashRouter>
    )
}

export {App}