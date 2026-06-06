import { useQuery } from "@tanstack/react-query"
import { getHomeContent } from "../apis/albumApi";

const useGetNewReleases = () => {
    return useQuery({
        queryKey:["home-content"],
        queryFn:getHomeContent,
    });
};

export default useGetNewReleases
