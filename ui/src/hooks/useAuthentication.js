import { useContext } from "react";
import AuthenticationContext from "../context/AuthenticationContextProvider";

export default function useAuthentication() {
  return useContext(AuthenticationContext);
}
