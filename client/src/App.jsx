import React, {useState} from 'react'
import {HashRouter, Routes, Route} from 'react-router-dom'
import Home from './views/Home'
import Interests from './views/Interests'
import About from './views/About'
import Resume from './views/Resume'
import Welcome from './views/Welcome'
import UnderConstruction from './views/UnderConstruction'
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

    const [isWelcome, setWelcome] = useState(false)

    return (
        <HashRouter>
            <div className='background'>
                <header>
                    <Header />
                </header>
                <main 
                    className='background-image' 
                    style={{backgroundImage:`url(${slateLake})`}}
                >
                    <Routes>
                        <Route path='/' 
                            element={
                                isWelcome ? <Welcome setWelcome={setWelcome} /> : <Home />
                            }
                        />
                        <Route path='about' element={<About />} />
                        <Route path='resume' element={<Resume />} />
                        <Route path='interests' element={<Interests />} />
                        <Route path='*' element={<PageNotFound />} />
                    </Routes>
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </HashRouter>
    )
}

export {App}