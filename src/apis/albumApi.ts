import axios from "axios"
import { HomeContentResponse } from "../models/album"

export const getHomeContent = async():Promise<HomeContentResponse>=>{
    try {
        const response = await axios.get<HomeContentResponse>("/api/home-content")
        return response.data
    } catch (error) {
        throw new Error("fail to fetch home content")
    }
}
