import { useContext } from "react";
import AuthenticationContext from "../context/AuthenticationContextProvider";

export default function useAuth() {
  return useContext(AuthenticationContext);
}
