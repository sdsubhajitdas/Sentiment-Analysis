import { axiosPrivate } from "../api/axios";
import useAuthentication from "./useAuthentication";

export default function useRefreshToken() {
  const { setAuthentication } = useAuthentication();

  const refresh = async () => {
    let accessToken = "";

    axiosPrivate
      .get("/auth/refresh")
      .then((response) => {
        setAuthentication((previous) => ({
          ...previous,
          isAuthenticated: true,
          user: { ...previous.user, accessToken: response.data.accessToken },
        }));
        accessToken = response.data.accessToken;
      })
      .catch((error) => {
        setAuthentication((previous) => ({
          ...previous,
          isAuthenticated: false,
        }));
      })
      .finally(() => {
        return accessToken;
      });

    return accessToken;
  };

  return refresh;
}
