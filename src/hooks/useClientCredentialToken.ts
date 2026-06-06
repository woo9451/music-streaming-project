import { useEffect, useState } from "react";
import { getClientCredentialToken } from "../apis/authApi";

const getStoredAccessToken = () => {
    const token = window.localStorage.getItem("spotify_client_access_token");
    const expiresAt = Number(window.localStorage.getItem("spotify_client_expires_at"));

    if (!token || !expiresAt || Date.now() > expiresAt) {
        window.localStorage.removeItem("spotify_client_access_token");
        window.localStorage.removeItem("spotify_client_expires_at");
        return undefined;
    }

    return token;
};

const useClientCredentialToken=()=>{
    const [accessToken, setAccessToken] = useState<string | undefined>(getStoredAccessToken);
    const [isLoading, setIsLoading] = useState(!accessToken);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const storedToken = getStoredAccessToken();

        if (storedToken) {
            setAccessToken(storedToken);
            setIsLoading(false);
            return;
        }

        getClientCredentialToken()
            .then((data) => {
                window.localStorage.setItem("spotify_client_access_token", data.access_token);
                window.localStorage.setItem(
                    "spotify_client_expires_at",
                    String(Date.now() + data.expires_in * 1000)
                );
                setAccessToken(data.access_token);
            })
            .catch((error) => {
                setError(error instanceof Error ? error : new Error("Fail to fetch token"));
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { accessToken, isLoading, error };
};

export default useClientCredentialToken;
