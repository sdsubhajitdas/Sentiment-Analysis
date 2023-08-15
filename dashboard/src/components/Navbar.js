import { Link } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import useAuthentication from "../hooks/useAuthentication";

export default function Navbar() {
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
    <nav className="flex gap-3 px-4 py-3 bg-teal-500 border-b-2 border-teal-700 ">
      <div className="grow"></div>
      <Link to="/">
        <img src="./logo.svg" className="w-16 h-16" alt="Website logo" />
      </Link>
      <Link to="/" className="my-auto">
        <h1 className="text-2xl font-medium sm:text-6xl">Dashboard</h1>
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
