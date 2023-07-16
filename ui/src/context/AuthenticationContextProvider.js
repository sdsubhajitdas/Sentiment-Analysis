import { useState, createContext } from "react";

const AuthenticationContext = createContext({});

export function AuthenticationProvider({ children }) {
  let [authentication, setAuthentication] = useState({
    isAuthenticated: false,
    user: null,
  });

  return (
    <AuthenticationContext.Provider
      value={{ authentication, setAuthentication }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationContext;
