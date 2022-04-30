import React from 'react'
import {Typography, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container} from '@material-ui/core'
import AppsIcon from "@material-ui/icons/Apps"
import {Terminal} from './Terminal'
import {Header} from './Header'

const App = function(){
    return (
        <>
            <CssBaseline />
            <Header />
            <main>
                <div>
                    <Container maxWidth="sm" >
                        <Typography variant="h2" align="center" color="textPrimary" gutterBottom >
                            Website
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph >
                            This is a place to showcase the work I've done.
                        </Typography>
                    </Container>
                    <Terminal/>
                </div>
            </main>
        </>
    //    <h1>Hello world</h1>
    )
        
}

export {App}