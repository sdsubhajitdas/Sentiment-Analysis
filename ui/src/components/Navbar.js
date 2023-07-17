import { Link } from "react-router-dom";
import useSidebarNavigation from "../hooks/useSidebarNavigation";
import { sidebarNavigationTypes } from "../context/SidebarNavigationContextProvider";

export default function Navbar() {
  let { setSidebarNavigation } = useSidebarNavigation();
  return (
    <nav className="flex gap-3 px-4 py-3 bg-teal-500 border-b-2 border-teal-700">
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
    </nav>
  );
}
