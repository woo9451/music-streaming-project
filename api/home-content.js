const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_SEARCH_URL = "https://api.spotify.com/v1/search";

const getAccessToken = async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Spotify server credentials are missing");
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  if (!response.ok) {
    throw new Error(`Spotify token request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
};

const searchSpotify = async (accessToken, params) => {
  const url = new URL(SPOTIFY_SEARCH_URL);
  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Spotify search failed with status ${response.status}`);
  }

  return response.json();
};

module.exports = async (request, response) => {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const accessToken = await getAccessToken();
    const currentYear = new Date().getFullYear().toString();

    const [newReleases, tracks, albums] = await Promise.all([
      searchSpotify(accessToken, {
        q: "tag:new",
        type: "album",
        market: "KR",
        limit: "6",
      }),
      searchSpotify(accessToken, {
        q: `year:${currentYear}`,
        type: "track",
        market: "KR",
        limit: "6",
      }),
      searchSpotify(accessToken, {
        q: `year:${currentYear}`,
        type: "album",
        market: "KR",
        limit: "6",
        offset: "6",
      }),
    ]);

    response.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return response.status(200).json({
      newReleases: newReleases.albums.items,
      tracks: tracks.tracks.items,
      albums: albums.albums.items,
    });
  } catch (error) {
    console.error("Failed to load Spotify home content", error);
    return response.status(500).json({ error: "Failed to load home content" });
  }
};
