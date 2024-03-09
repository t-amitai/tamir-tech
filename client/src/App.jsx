import React, {useState} from 'react'
import {HashRouter, Routes, Route} from 'react-router-dom'
import Home from './views/Home'
import About from './views/About'
import Resume from './views/Resume'
import Welcome from './views/Welcome'
import UnderConstruction from './views/UnderConstruction'
import Header from './components/Header'
import PageNotFound from './views/PageNotFound'
import Footer from './components/Footer'
import Space from './components/Space'

const App = function(){
    function checkIsWelcome() {
        const cookieArray = document.cookie.split('; ')
        const cookie = cookieArray.find(cookie => cookie.startsWith('welcome='))
        if (cookie) {
            return false
        }
        return true
    }

    const [isWelcome, setWelcome] = useState(checkIsWelcome)

    return (
        <HashRouter>
        <div
            className='background background-main flex flex-col justify-between'
        >
            <header className='h-50 lg:h-100'>
                <Header />
            </header>
            <main className='h-full'>
                <Routes>
                    <Route path='/' 
                        element={
                            isWelcome ? <Welcome setWelcome={setWelcome} /> : <Home />
                        }
                    />
                    <Route path='space' element={<Space/>} />
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