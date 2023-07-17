import useAuthentication from "./useAuthentication";
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";

export default function useAxiosPrivate() {
  const {
    authentication: {
      user: { token },
    },
  } = useAuthentication();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"])
          config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previousRequest = error?.config;
        if (error?.response?.status === 403 && !previousRequest?.sent) {
          previousRequest.sent = true;
          previousRequest.headers["Authorization"] = "";
          return axiosPrivate(previousRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [token]);

  return axiosPrivate;
}
