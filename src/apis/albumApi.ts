import axios from "axios"
import { SPOTIFY_BASE_URL } from "../configs/commonConfig"
import { GetNewReleasesResponse, GetTracksResponse, HomeContentResponse } from "../models/album"

const currentYear = new Date().getFullYear();

export const getNewReleases = async(clientCredentialToken:string, limit = 6):Promise<GetNewReleasesResponse>=>{
    try{
     const response = await axios.get(
        `${SPOTIFY_BASE_URL}/search`, {
        headers:{
            Authorization:`Bearer ${clientCredentialToken}`
        },
        params:{
            q:"tag:new",
            type:"album",
            market:"KR",
            limit,
        },
     })
     return response.data
    }catch(error){
        throw new Error("fail to fetch new releases")
    }
}

export const getTracks = async(clientCredentialToken:string, limit = 6):Promise<GetTracksResponse>=>{
    try{
     const response = await axios.get(
        `${SPOTIFY_BASE_URL}/search`, {
        headers:{
            Authorization:`Bearer ${clientCredentialToken}`
        },
        params:{
            q:`year:${currentYear}`,
            type:"track",
            market:"KR",
            limit,
        },
     })
     return response.data
    }catch(error){
        throw new Error("fail to fetch tracks")
    }
}

export const getAlbums = async(clientCredentialToken:string, limit = 6):Promise<GetNewReleasesResponse>=>{
    try{
     const response = await axios.get(
        `${SPOTIFY_BASE_URL}/search`, {
        headers:{
            Authorization:`Bearer ${clientCredentialToken}`
        },
        params:{
            q:`year:${currentYear}`,
            type:"album",
            market:"KR",
            limit,
            offset:6,
        },
     })
     return response.data
    }catch(error){
        throw new Error("fail to fetch albums")
    }
}

export const getHomeContent = async(clientCredentialToken:string):Promise<HomeContentResponse>=>{
    const [newReleases, tracks, albums] = await Promise.all([
        getNewReleases(clientCredentialToken),
        getTracks(clientCredentialToken),
        getAlbums(clientCredentialToken),
    ]);

    return {
        newReleases: newReleases.albums.items,
        tracks: tracks.tracks.items,
        albums: albums.albums.items,
    };
}
