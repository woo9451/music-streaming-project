import axios from "axios"
import { clientId, clientSecret, redirectUri } from "../configs/authConfig";
import { ClientCredentialTokenResponse } from "../models/auth";

const encodedBase64 = (data: string): string => {
    if (typeof window !== "undefined") {
        // 브라우저 환경
        return btoa(data);
    } else {
        // Node.js 환경
        return Buffer.from(data).toString("base64");
    }
};

const generateRandomString = (length: number) => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, value) => acc + possible[value % possible.length], "");
};

const sha256 = async (plain: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input: ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
};

export const redirectToSpotifyLogin = async () => {
    if (!clientId) {
        throw new Error("Spotify client id is missing");
    }

    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    window.localStorage.setItem("spotify_code_verifier", codeVerifier);
    authUrl.search = new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        scope: "user-read-private",
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    }).toString();

    window.location.href = authUrl.toString();
};

export const getTokenByCode = async (code: string): Promise<ClientCredentialTokenResponse> => {
    if (!clientId) {
        throw new Error("Spotify client id is missing");
    }

    const codeVerifier = window.localStorage.getItem("spotify_code_verifier");
    if (!codeVerifier) {
        throw new Error("Spotify code verifier is missing");
    }

    const body = new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
    });

    const response = await axios.post("https://accounts.spotify.com/api/token", body, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    return response.data;
};

export const getClientCredentialToken = async():Promise<ClientCredentialTokenResponse>=>{
    try {
        const body = new URLSearchParams({
            grant_type:"client_credentials"
        })
        const response = await axios.post("/api/token",body,{
            headers:{
                Authorization:`Basic ${encodedBase64(
                    clientId+":"+clientSecret
                )}`,
                "Content-Type":"application/x-www-form-urlencoded"
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Fail to fetch client credential token")
    }
}
