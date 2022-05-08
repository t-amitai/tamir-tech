import * as React from 'react'
import {Container, Typography} from '@material-ui/core'

function Home() {
    return (
        <div>
            <Container maxWidth="sm" >
                <Typography variant="h2" align="center" color="textPrimary" gutterBottom >
                    Tamir Amitai
                </Typography>
            </Container>
        </div>
    )
}

export {Home}