import { useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { loginWithGoogle } from "../../api/authApi";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "1030841666850-oiom90uv1sofs7f527ujepiq496b22nv.apps.googleusercontent.com",
    iosClientId:
      "1030841666850-oiom90uv1sofs7f527ujepiq496b22nv.apps.googleusercontent.com",
    androidClientId:
      "1030841666850-oiom90uv1sofs7f527ujepiq496b22nv.apps.googleusercontent.com",
    useProxy: true,
  });

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const sendTokenToBackend = async () => {
      try {
        const googleAccessToken = response.authentication.accessToken;

        const res = await loginWithGoogle(googleAccessToken);
        const jwt = res.data.token;

        authCtx.authenticate(jwt);
      } catch (error) {
        console.error("Google login error:", error);
      }
    };

    if (response?.type === "success") {
      sendTokenToBackend();
    }
  }, [response]);

  return { request, promptAsync };
};
