import { useState, createContext } from "react";

const SidebarNavigationContext = createContext({});
export const sidebarNavigationTypes = {
  DASHBOARD: "dashboard",
  NEW_QUERY: "new_query",
  QUERY_RESULT: "query_result",
};

export function SidebarNavigationProvider({ children }) {
  let [sidebarNavigation, setSidebarNavigation] = useState({
    type: sidebarNavigationTypes.DASHBOARD,
    query: null,
  });

  return (
    <SidebarNavigationContext.Provider
      value={{ sidebarNavigation, setSidebarNavigation }}
    >
      {children}
    </SidebarNavigationContext.Provider>
  );
}

export default SidebarNavigationContext;
