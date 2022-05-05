import React from 'react'
import {Link} from 'react-router-dom'
import {Box, ButtonBase, Typography} from '@material-ui/core'

function NavBar() {
    return (
        <Box sx={{ display: "flex",
                   justifyContent: "left",
                   flexShrink: 3 }}
        >
            <Typography>
                Tamir Amitai
            </Typography>
            <ButtonBase component={Link} to="/">
                <Typography>
                    Home
                </Typography>
            </ButtonBase>
            <ButtonBase component={Link} to="/projects">
                <Typography>
                    Projects
                </Typography>
            </ButtonBase>
            <ButtonBase component={Link} to="/resume">
                <Typography>
                    Resume
                </Typography>
            </ButtonBase>
        </Box>
    )
}

export {NavBar}
