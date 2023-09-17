import React from 'react'
import {CssBaseline} from '@material-ui/core'
import {HashRouter, Route, Routes} from 'react-router-dom'
import {Home} from './views/Home'
import {Projects} from './views/Projects'
import {Resume} from './views/Resume'
import {PageNotFound} from './views/PageNotFound'
import {Copyright} from './components/Copyright'
import {NavBar} from './components/NavBar'

const App = function(){
    return (
        <>
            <CssBaseline />
            <HashRouter>
                <header>
                    <NavBar />
                </header>
                <main>
                    <Routes>
                        <Route path="/" element= {<Home />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="resume" element={<Resume />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </main>
                <footer>
                    <Copyright/>
                </footer>
            </HashRouter>
        </>
    )      
}

export {App}