export const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
export const redirectUri =
    process.env.REACT_APP_SPOTIFY_REDIRECT_URI ||
    (typeof window !== "undefined" ? window.location.origin : "");
