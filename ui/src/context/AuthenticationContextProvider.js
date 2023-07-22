import { useState, createContext } from "react";
import axios from "../api/axios";
import { useEffect } from "react";

const AuthenticationContext = createContext({});

export function AuthenticationProvider({ children }) {
  let [authentication, setAuthentication] = useState({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    axios
      .get("/auth/refresh")
      .then((response) => {
        setAuthentication((previous) => ({
          ...previous,
          isAuthenticated: true,
          user: response.data,
        }));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{ authentication, setAuthentication }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationContext;
