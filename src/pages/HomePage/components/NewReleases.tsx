import { Box, styled, Typography } from '@mui/material'
import React from 'react'
import useGetNewReleases from '../../../hooks/useGetNewReleases'
import LoadingSpinner from '../../../common/components/LoadingSpinner/LoadingSpinner'
import ErrorMessage from '../../../common/components/ErrorMessage'
import Card from '../../../common/components/Card'

const NewReleases = () => {
  const {data,error,isLoading}=useGetNewReleases()
  if(isLoading){
    return<LoadingSpinner/>
  }
  if(error){
    return <ErrorMessage errorMessage={error.message}/>
  }
  return (
    <Section>
    {data ? (
      <>
        <CardSection title="New Released Albums">
          {data.newReleases.map((album)=>(
            <CardItem key={album.id}>
              <Card 
                image={album.images[0]?.url}
                name={album.name}
                artistName={album.artists[0].name}
                />
            </CardItem>
          ))}
        </CardSection>
        <CardSection title="TRACKS">
          {data.tracks.map((track)=>(
            <CardItem key={track.id}>
              <Card 
                image={track.album.images[0]?.url}
                name={track.name}
                artistName={track.artists[0].name}
                />
            </CardItem>
          ))}
        </CardSection>
        <CardSection title="ALBUMS">
          {data.albums.map((album)=>(
            <CardItem key={album.id}>
              <Card 
                image={album.images[0]?.url}
                name={album.name}
                artistName={album.artists[0].name}
                />
            </CardItem>
          ))}
        </CardSection>
      </>
    ) : (
      <Typography variant="h2">No Data</Typography>
    )}
    </Section>
  )
}

export default NewReleases

interface CardSectionProps {
  title:string;
  children:React.ReactNode;
}

const CardSection = ({title, children}:CardSectionProps) => (
  <Box>
    <SectionTitle variant="h1">
      {title}
    </SectionTitle>
    <CardRow>
      {children}
    </CardRow>
  </Box>
);

const Section = styled(Box)({
  padding: "0 16px 32px",
  overflow: "hidden",
});

const SectionTitle = styled(Typography)({
  paddingTop: "8px",
  marginBottom: "8px",
});

const CardRow = styled(Box)({
  display: "flex",
  gap: "12px",
  marginBottom: "8px",
  overflowX: "auto",
  overflowY: "hidden",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const CardItem = styled(Box)(({ theme }) => ({
  flex: "0 0 150px",
  minWidth: 0,
  [theme.breakpoints.down("sm")]: {
    flexBasis: "132px",
  },
}));
