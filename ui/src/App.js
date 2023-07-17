import { Route, Routes, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Providers from "./context";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Providers>
      {/* <div> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Screen />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
      </Routes>
      {/* </div> */}
    </Providers>
  );
}

function Screen() {
  return (
    <>
      <Navbar />
      {/* <div className="container"> */}
      <Outlet />
      {/* </div> */}
    </>
  );
}
