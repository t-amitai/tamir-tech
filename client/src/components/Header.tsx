import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import AppsIcon from "@material-ui/icons/Apps"

const Header = () => {
    return (
        <AppBar position="relative" >
            <Toolbar>
                <AppsIcon />
                <Typography variant="h6" >
                    Tamir Amitai
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
export {Header}