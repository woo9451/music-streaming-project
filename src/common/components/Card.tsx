import { Box, styled, Typography } from '@mui/material'
import React from 'react'
import PlayButton from './PlayButton';

interface CardProps {
    name:string;
    image:string | undefined;
    artistName:string | undefined
}
const Card = ({image,name,artistName}:CardProps) => {
  return (
    <CardContainer>
        <ImageWrap>
            {image && <CoverImage src={image} alt={name}/>}
            <PlayButtonWrap className="play-button-wrap">
                <PlayButton />
            </PlayButtonWrap>
        </ImageWrap>
        <AlbumName>{name}</AlbumName>
        <ArtistName>{artistName}</ArtistName>
    </CardContainer>
  )
}

export default Card

const CardContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    minWidth: 0,
    padding: "12px",
    borderRadius: "6px",
    backgroundColor: "transparent",
    cursor: "pointer",
    transition: "background-color 160ms ease",
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:hover .play-button-wrap": {
        opacity: 1,
        transform: "translateY(0)",
    },
}));

const ImageWrap = styled(Box)({
    position: "relative",
    width: "100%",
    aspectRatio: "1 / 1",
    marginBottom: "12px",
    borderRadius: "6px",
    overflow: "hidden",
    backgroundColor: "#282828",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
});

const CoverImage = styled("img")({
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
});

const PlayButtonWrap = styled(Box)({
    position: "absolute",
    right: "8px",
    bottom: "8px",
    opacity: 0,
    transform: "translateY(8px)",
    transition: "opacity 160ms ease, transform 160ms ease",
});

const AlbumName = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: 1.35,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
}));

const ArtistName = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: "13px",
    lineHeight: 1.35,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
}));
