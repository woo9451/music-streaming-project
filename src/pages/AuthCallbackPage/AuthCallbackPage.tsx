import { Alert } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { getTokenByCode } from "../../apis/authApi";
import LoadingSpinner from "../../common/components/LoadingSpinner/LoadingSpinner";

const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const hasRequestedToken = useRef(false);

  useEffect(() => {
    if (hasRequestedToken.current) {
      return;
    }

    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      setErrorMessage(error);
      return;
    }

    if (!code) {
      setErrorMessage("Spotify authorization code is missing");
      return;
    }

    hasRequestedToken.current = true;

    getTokenByCode(code)
      .then((data) => {
        window.localStorage.setItem("spotify_access_token", data.access_token);
        window.localStorage.setItem(
          "spotify_expires_at",
          String(Date.now() + data.expires_in * 1000)
        );
        window.localStorage.removeItem("spotify_code_verifier");
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error("Spotify login failed", error.response?.data || error);
        setErrorMessage("Fail to login with Spotify");
      });
  }, [navigate, searchParams]);

  if (errorMessage) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  return <LoadingSpinner />;
};

export default AuthCallbackPage;
