import { useContext } from "react";
import SidebarNavigationContext from "../context/SidebarNavigationContextProvider";

export default function useSidebarNavigation() {
  return useContext(SidebarNavigationContext);
}
