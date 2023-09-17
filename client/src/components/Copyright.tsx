import * as React from 'react'
import {Typography} from '@material-ui/core'

function Copyright() {
  return (
    <Typography>
      {'Copyright © '}
      Tamir Amitai
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export {Copyright}
