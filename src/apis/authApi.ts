import axios from "axios"
import { CLIENT_ID, redirectUri } from "../configs/authConfig";
import { ClientCredentialTokenResponse, ExchangeTokenResponse } from "../models/auth";
import { REDIRECT_URI } from "../configs/commonConfig";

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
    if (!CLIENT_ID) {
        throw new Error("Spotify client id is missing");
    }

    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    window.localStorage.setItem("spotify_code_verifier", codeVerifier);
    authUrl.search = new URLSearchParams({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: "user-read-private",
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    }).toString();

    window.location.href = authUrl.toString();
};

export const getTokenByCode = async (code: string): Promise<ClientCredentialTokenResponse> => {
    if (!CLIENT_ID) {
        throw new Error("Spotify client id is missing");
    }

    const codeVerifier = window.localStorage.getItem("spotify_code_verifier");
    if (!codeVerifier) {
        throw new Error("Spotify code verifier is missing");
    }

    const body = new URLSearchParams({
        client_id: CLIENT_ID,
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

export const exchangeToken=async(code:string,codeVerifier:string):Promise<ExchangeTokenResponse>=>{
    try{
     const url = "https://accounts.spotify.com/api/token"
     if(!CLIENT_ID || !REDIRECT_URI){
        throw new Error("Missing required parameters")
     }
     const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
     })

     const response = await axios.post(url,body,{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        }
     })
     return response.data
    }catch(error){
        throw new Error("fail to fetch token")
    }
}
