import { Button } from '@mui/material'
import React from 'react'
import { redirectToSpotifyLogin } from '../../apis/authApi'

const LoginButton = () => {
  return (
    <Button variant="contained" color="secondary" size="large" onClick={redirectToSpotifyLogin}>
        Login
    </Button>
  )
}

export default LoginButton
