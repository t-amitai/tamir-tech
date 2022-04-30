import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import AppsIcon from "@material-ui/icons/Apps"

const Header = () => {
    return (
        <header>
            <AppBar position="relative" >
                <Toolbar>
                    <AppsIcon />
                    <Typography variant="h6" >
                        Tamir Amitai
                    </Typography>
                </Toolbar>
            </AppBar>
        </header>
    )
}
export {Header}