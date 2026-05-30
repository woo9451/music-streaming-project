import AddIcon from '@mui/icons-material/Add';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, styled, Typography } from '@mui/material'
import React from 'react'
import { NavLink, Outlet } from 'react-router'
import Navbar from './components/Navbar';

const Layout = styled("div")({
    display:"flex",
    height:"100vh",
    padding:"8px"
});

const Sidebar = styled("div")(({theme})=>({
    width:"331px",
    height:"100%",
    display:"flex",
    flexDirection:"column",
    [theme.breakpoints.down("sm")]:{
      display:"none",
    },
}));

const ContentBox = styled(Box)(({theme})=>({
    borderRadius:"8px",
    backgroundColor:theme.palette.background.paper,
    color:theme.palette.text.primary,
    width:"100%",
    minWidth:0,
    overflowY:"auto",
    padding:"8px",
    marginBottom:"8px",
    marginRight:"8px"
}));

const LibraryBox = styled(ContentBox)({
  flex: 1,
});

const NavList = styled("ul")({
  listStyle:"none",
  padding: 0,
  margin: 0,
});

const StyledNavLink = styled(NavLink)(({theme})=>({
  textDecoration:"none",
  display:"flex",
  alignItems:"center",
  gap:"20px",
  padding:"12px 8px",
  color:theme.palette.text.secondary,
  "&:hover":{
    color:theme.palette.text.primary
  },
  "&.active":{
    color:theme.palette.text.primary,
  },
}));

const LibraryHeader = styled(Box)({
  display:"flex",
  alignItems:"center",
  justifyContent:"space-between",
  padding:"8px",
});

const LibraryTitle = styled(Box)(({theme})=>({
  display:"flex",
  alignItems:"center",
  gap:"16px",
  color:theme.palette.text.primary,
}));

const AddButton = styled(Button)(({theme})=>({
  minWidth:"32px",
  width:"32px",
  height:"32px",
  padding:0,
  color:theme.palette.primary.main,
  borderRadius:"50%",
  "&:hover":{
    backgroundColor:theme.palette.action.hover,
  },
}));

const PlaylistCard = styled(Box)(({theme})=>({
  backgroundColor:theme.palette.action.hover,
  borderRadius:"8px",
  padding:"16px",
  margin:"8px",
}));

const PlaylistButton = styled(Button)({
  marginTop:"16px",
  padding:"6px 18px",
  fontWeight:700,
});

const AppLayout = () => {
  return (
    <Layout>
        <Sidebar>
          <ContentBox>
            <NavList>
              <StyledNavLink to="/" end>
                <HomeIcon/>
                  <Typography variant="h2" sx={{ fontWeight: 700 }}>
                    Home
                  </Typography>
              </StyledNavLink>
              <StyledNavLink to="/search">
                <SearchIcon/>
                <Typography variant="h2" sx={{ fontWeight: 700 }}>
                  Search
                </Typography>
              </StyledNavLink>
            </NavList>
          </ContentBox>
          <LibraryBox>
            <LibraryHeader>
              <LibraryTitle>
                <BookmarkIcon/>
                <Typography variant="h2" sx={{ fontWeight: 700 }}>
                  Your Library
                </Typography>
              </LibraryTitle>
              <AddButton aria-label="Create playlist">
                <AddIcon/>
              </AddButton>
            </LibraryHeader>
            <PlaylistCard>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                Create your first playlist
              </Typography>
              <Typography variant="subtitle1">
                It's easy, we'll help you
              </Typography>
              <PlaylistButton variant="contained" color="secondary">
                Create playlist
              </PlaylistButton>
            </PlaylistCard>
          </LibraryBox>
        </Sidebar>
        <ContentBox>
          <Navbar/>
          <Outlet/>
        </ContentBox>
    </Layout>
  )
}

export default AppLayout
