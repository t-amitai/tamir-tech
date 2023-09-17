import * as React from 'react'
import {Container, Typography} from '@material-ui/core'

function Home() {
    return (
        <div>
            <Container maxWidth="sm" >
                <Typography variant="h2" align="center" color="textPrimary" gutterBottom >
                    Tamir Amitai
                </Typography>
                {/* <Typography variant="h5" align="center" color="textSecondary" paragraph >
                This is a place to showcase the work I've done.
                </Typography> */}
            </Container>
        </div>
    )
}

export {Home}