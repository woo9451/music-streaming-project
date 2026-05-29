import axios from "axios"
import { SPOTIFY_BASE_URL } from "../configs/commonConfig"
import { GetNewReleasesResponse } from "../models/album"

export const getNewReleases = async(clientCredentialToken:string):Promise<GetNewReleasesResponse>=>{
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
            limit:6,
        },
     })
     return response.data
    }catch(error){
        throw new Error("fail to fetch new releases")
    }
}
