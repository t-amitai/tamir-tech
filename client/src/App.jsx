import React, {useEffect} from 'react'
import {HashRouter, Routes, Route, Redirect, useNavigate} from 'react-router-dom'
import Home from './views/Home'
import About from './views/About'
import Resume from './views/Resume'
import Welcome, { welcomeAnimation } from './views/Welcome'
import UnderConstruction from './views/UnderConstruction'
import Header from './components/Header'
import PageNotFound from './views/PageNotFound'
import Copyright from './components/Copyright'

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
            <header className="font-sans text-xl lg:text-2xl bg-cyan-400">
                <Header
                    navigation={[
                        {name: 'Home', link:'home'},
                        {name:'About', link:'about'},
                        {name:'Resume', link:'resume'},
                        {name:'Projects', link:'project'},
                    ]}
                />
            </header>
            <main className="min-h-full text-lg bg-gradient-to-b from-cyan-400 to-teal-400">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="welcome" element={<Welcome />} />
                    <Route path="about" element={<About />} />
                    <Route path="resume" element={<Resume />} />
                    <Route path="projects" element={<UnderConstruction />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </main>
            <footer className="sticky bottom-0 lg:text-4xl bg-teal-400">
                <Copyright/>
            </footer>
        </HashRouter>
    )      
}

export {App}