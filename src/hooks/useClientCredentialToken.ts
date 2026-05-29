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

const useClientCredentialToken=(): string | undefined=>{
    const [accessToken, setAccessToken] = useState<string | undefined>(getStoredAccessToken);

    useEffect(() => {
        setAccessToken(getStoredAccessToken());
    }, []);

    return accessToken;
};

export default useClientCredentialToken;
