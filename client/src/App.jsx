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
    function setCookie() {
        const daysToExpire = 1
        const timestamp = new Date()
        timestamp.setTime(timestamp.getTime() + (daysToExpire * 24 * 60 * 60 * 1000))
        const expireTimestamp = timestamp.toUTCString()
        document.cookie = `expires=${expireTimestamp}`
    }
    function checkIsWelcome() {
        const cookieArray = document.cookie.split('; ')
        const cookie = cookieArray.find(cookie => cookie.startsWith('expires='))
        if (cookie) {
            const expireTimestamp = new Date(cookie.split('=')[1])
            const timestamp = new Date()
            return expireTimestamp < timestamp
        }
        return true;
    }

    const [isWelcome, setWelcome] = useState(checkIsWelcome)

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
                    <Route path='/' 
                        element={
                            !isWelcome ? <Home /> : <Welcome setWelcome={setWelcome} setCookie={setCookie}/>
                        }
                    />
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