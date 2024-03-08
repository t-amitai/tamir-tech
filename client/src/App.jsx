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
    const [welcome, setWelcome] = useState(true)

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
            className='h-screen w-screen flex flex-col justify-between background-main'
        >
            <header className='h-50 lg:h-100'>
                <Header />
            </header>
            <main className='h-full'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='welcome' element={<Welcome />} />
                    <Route path='about' element={<About />} />
                    <Route path='resume' element={<Resume />} />
                    <Route path='projects' element={<UnderConstruction />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </main>
            <footer className='h-15'>
                <Footer />
            </footer>
        </div>
        </HashRouter>
    )
}

export {App}