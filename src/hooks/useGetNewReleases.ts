import { useQuery } from "@tanstack/react-query"
import { getHomeContent } from "../apis/albumApi";

const useGetNewReleases = () => {
    const accessToken = localStorage.getItem("spotify_access_token");

    return useQuery({
        queryKey:["home-content"],
        queryFn:()=>getHomeContent(accessToken!),
        enabled:!!accessToken,
    });
};

export default useGetNewReleases
