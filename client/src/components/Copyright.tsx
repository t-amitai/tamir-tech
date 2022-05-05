import React from 'react'
import {Typography} from '@material-ui/core'

function Copyright(props) {
  return (
    <Typography variant="body2" color="secondary.main" align="center" {...props}>
      {'Copyright © '}
      Tamir Amitai
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export {Copyright}
