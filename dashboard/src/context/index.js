import QueryProvider from "./QueryContextProvider";
import { AuthenticationProvider } from "./AuthenticationContextProvider";

export default function Providers({ children }) {
  return (
    <AuthenticationProvider>
      <QueryProvider>{children}</QueryProvider>
    </AuthenticationProvider>
  );
}
