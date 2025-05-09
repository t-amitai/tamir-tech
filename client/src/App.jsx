import React, {useState} from 'react'
import {HashRouter, Routes, Route} from 'react-router-dom'
import Home from './views/Home'
import Interests from './views/Interests'
import Contact from './views/Contact'
import About from './views/About'
import Resume from './views/Resume'
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
            <div className='background'>
                <header>
                    <Header />
                </header>
                <main className='relative'>
                    <img 
                        className={`background-image ${isWelcome?'':'opacity-25'}`}
                        src={slateLake}
                    />
                    <div className='absolute inset-x-0 top-0'>
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
                <footer className='fixed bottom-0 md:relative'>
                    <Footer />
                </footer>
            </div>
        </HashRouter>
    )
}

export {App}