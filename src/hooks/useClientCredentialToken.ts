import { useEffect, useState } from "react";

const getStoredAccessToken = () => {
    const token = window.localStorage.getItem("spotify_access_token");
    const expiresAt = Number(window.localStorage.getItem("spotify_expires_at"));

    if (!token || !expiresAt || Date.now() > expiresAt) {
        window.localStorage.removeItem("spotify_access_token");
        window.localStorage.removeItem("spotify_expires_at");
        return undefined;
    }

    return token;
};

const useClientCredentialToken=()=>{
    const [accessToken, setAccessToken] = useState<string | undefined>(getStoredAccessToken);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const storedToken = getStoredAccessToken();

        if (storedToken) {
            setAccessToken(storedToken);
            return;
        }

        setAccessToken(undefined);
        setError(null);
    }, []);

    return { accessToken, isLoading, error };
};

export default useClientCredentialToken;
