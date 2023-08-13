import { Link } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import useAuthentication from "../hooks/useAuthentication";
import useSidebarNavigation from "../hooks/useSidebarNavigation";
import { sidebarNavigationTypes } from "../context/SidebarNavigationContextProvider";

export default function Navbar() {
  const { setSidebarNavigation } = useSidebarNavigation();
  const { setAuthentication } = useAuthentication();

  async function logout() {
    await axiosPrivate.get("/auth/logout");
    setAuthentication((previous) => ({
      ...previous,
      isAuthenticated: false,
      user: null,
    }));
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 flex gap-3 px-4 py-3 bg-teal-500 border-b-2 border-teal-700">
      <div className="grow"></div>
      <Link
        to="/"
        onClick={() =>
          setSidebarNavigation((previous) => ({
            ...previous,
            type: sidebarNavigationTypes.DASHBOARD,
          }))
        }
      >
        <img src="./logo.svg" className="w-16 h-16" alt="Website logo" />
      </Link>
      <Link
        to="/"
        className="my-auto"
        onClick={() =>
          setSidebarNavigation((previous) => ({
            ...previous,
            type: sidebarNavigationTypes.DASHBOARD,
          }))
        }
      >
        <h1 className="text-2xl font-medium sm:text-6xl">Sentiment Analysis</h1>
      </Link>
      <div className="grow"></div>
      <button
        className="px-5 my-2 text-xl font-medium text-black bg-white border-2 border-teal-700 rounded-md hover:bg-gray-200"
        onClick={logout}
      >
        Logout
      </button>
    </nav>
  );
}
