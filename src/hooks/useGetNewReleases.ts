import { useQuery } from "@tanstack/react-query"
import { getHomeContent } from "../apis/albumApi";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetNewReleases = () => {
 const { accessToken, isLoading: isTokenLoading, error: tokenError } = useClientCredentialToken()
    const query = useQuery({
        queryKey:["home-content"],
        queryFn:async()=>{
         return getHomeContent(accessToken!);
        },
        enabled:!!accessToken,
    });

    return {
        ...query,
        error: tokenError || query.error,
        isLoading: isTokenLoading || query.isLoading,
    };
};

export default useGetNewReleases
