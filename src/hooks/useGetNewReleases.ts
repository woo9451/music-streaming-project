import { useQuery } from "@tanstack/react-query"
import { getNewReleases } from "../apis/albumApi";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetNewReleases = () => {
 const clientCredentialToken = useClientCredentialToken()
    return useQuery({
        queryKey:["new-releases"],
        queryFn:async()=>{
         return getNewReleases(clientCredentialToken);
        },
        enabled:!!clientCredentialToken,
    });
};

export default useGetNewReleases
