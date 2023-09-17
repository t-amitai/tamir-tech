import React from 'react'
import { HashRouter, Route, Routes, Link } from 'react-router-dom'
import { Home } from './views/Home'
import { About } from './views/About'
import { Resume } from './views/Resume'
import { Header } from './components/Header'
import { PageNotFound } from './views/PageNotFound'
import { Copyright } from './components/Copyright'

const VIEWS = ['About', 'Resume'];

const App = function(){
    return (
        <>
            <HashRouter>
                <header>
                    <Header views={VIEWS}/>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element= {<Home />} />
                        {VIEWS.map((view)=>{
                            const path = view;
                            const element = <view />;
                            return <Route path={path} element={element} />
                        })};
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