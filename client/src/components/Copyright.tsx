import React from 'react'

export function Copyright() {
  return (
    <div>
      {'Copyright © '}
      Tamir Amitai
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </div>
  )
}

