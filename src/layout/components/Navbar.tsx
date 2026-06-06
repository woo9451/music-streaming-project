import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  styled,
} from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import LoginButton from '../../common/components/LoginButton'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const queryClient = useQueryClient()
  const {data:userProfile}=useGetCurrentUserProfile()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const logout = () => {
    localStorage.removeItem("spotify_access_token")
    localStorage.removeItem("spotify_expires_at")
    queryClient.removeQueries({ queryKey: ["current-user-profile"] })
    queryClient.removeQueries({ queryKey: ["home-content"] })
    handleMenuClose()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '64px',
      }}
    >
    {userProfile ? (
      <ProfileContainer>
        <IconButton onClick={handleMenuOpen} size="small" aria-label="Open profile menu">
          <Avatar
            src={userProfile.images[0]?.url}
            alt={userProfile.display_name || "Spotify user"}
          />
        </IconButton>
        <ProfileMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          keepMounted
        >
          <ProfileMenuItem onClick={logout}>Log out</ProfileMenuItem>
        </ProfileMenu>
      </ProfileContainer>
    ) : (
      <LoginButton/>
    )}
    </Box>
  )
}

export default Navbar

const ProfileContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "8px",
})

const ProfileMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    minWidth: "160px",
  },
}))

const ProfileMenuItem = styled(MenuItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}))
