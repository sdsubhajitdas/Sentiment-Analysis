import QueryProvider from "./QueryContextProvider";
import { AuthenticationProvider } from "./AuthenticationContextProvider";
import { SidebarNavigationProvider } from "./SidebarNavigationContextProvider";

export default function Providers({ children }) {
  return (
    <AuthenticationProvider>
      <QueryProvider>
        <SidebarNavigationProvider>{children}</SidebarNavigationProvider>
      </QueryProvider>
    </AuthenticationProvider>
  );
}
