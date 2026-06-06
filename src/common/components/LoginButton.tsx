import { Button } from '@mui/material'
import React from 'react'
import { redirectToSpotifyLogin } from '../../apis/authApi'

const LoginButton = () => {
  const login=()=>{
    redirectToSpotifyLogin()
  }
  return (
    <Button variant="contained" color="secondary" size="large" onClick={login}>
        Login
    </Button>
  )
}

export default LoginButton
