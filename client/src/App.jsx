import React, {useState} from 'react'
import {HashRouter, Routes, Route} from 'react-router-dom'
import Home from './views/Home'
import Interests from './views/Interests'
import Contact from './views/Contact'
import About from './views/About'
import Resume from './views/Resume'
import PrivacyPolicy from './views/PrivacyPolicy'
import CookiePolicy from './views/CookiePolicy'
import Welcome from './views/Welcome'
import Header from './components/Header'
import PageNotFound from './views/PageNotFound'
import Footer from './components/Footer'
import slateLake from './images/slateLake.jpg'

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
            <Routes>
                <Route path='privacy' element={<PrivacyPolicy />} />
                <Route path='cookies' element={<CookiePolicy />} />
                <Route path='*' element={
                    <div className='background flex flex-col'>
                        <header>
                            <Header />
                        </header>
                        <main className='relative flex-1'>
                            <img
                                className={`background-image absolute inset-0 h-full object-cover ${isWelcome?'':'opacity-25'}`}
                                src={slateLake}
                            />
                            <div className='relative'>
                                <Routes>
                                    <Route path='/'
                                        element={
                                            !isWelcome ? <Home /> : <Welcome setWelcome={setWelcome} />
                                        }
                                    />
                                    <Route path='contact' element={<Contact />} />
                                    <Route path='about' element={<About />} />
                                    <Route path='resume' element={<Resume />} />
                                    <Route path='interests' element={<Interests />} />
                                    <Route path='*' element={<PageNotFound />} />
                                </Routes>
                            </div>
                        </main>
                        <footer className='mt-auto'>
                            <Footer />
                        </footer>
                    </div>
                } />
            </Routes>
        </HashRouter>
    )
}

export {App}