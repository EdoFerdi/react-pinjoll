import React, { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

//import ProtectedRoute from "./components/ProtectedRoute"; // ProtectedRoute Component
//import Logout from "./components/Logout";

//const Home = React.lazy(() => import("./components/Home"));
const OrangList = React.lazy(() => import("./components/Orang/List"));
const OrangCreate = React.lazy(() => import("./components/Orang/Create"));
const OrangEdit = React.lazy(() => import("./components/Orang/Edit"));
const PinjamanList = React.lazy(() => import("./components/Pinjaman/List"));
const PinjamanCreate = React.lazy(() => import("./components/Pinjaman/Create"));
const PinjamanEdit = React.lazy(() => import("./components/Pinjaman/Edit"));
const PembayaranList = React.lazy(() => import("./components/Pembayaran/List"));
const PembayaranCreate = React.lazy(() => import("./components/Pembayaran/Create"));
const PembayaranEdit = React.lazy(() => import("./components/Pembayaran/Edit"));

//const Login = React.lazy(() => import("./components/Login"));
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken")); // Ambil token dari localStorage

  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/orang" className="nav-link">
                  Orang
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/pinjaman" className="nav-link">
                  Pinjaman
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/pembayaran" className="nav-link">
                  Pembayaran
                </NavLink>
              </li>
              <li>
                {token ? ( // Tampilkan Logout jika token ada
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                ) : (
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        {/* <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Home />} /> */}
        <Route path="/orang" element={<OrangList />} />
        <Route path="/orang/create" element={<OrangCreate />} />
        <Route path="/orang/edit/:id" element={<OrangEdit />} />
        <Route path="/pinjaman" element={<PinjamanList />} />
        <Route path="/pinjaman/create" element={<PinjamanCreate />} />
        <Route path="/pinjaman/edit/:id" element={<PinjamanEdit />} />
        <Route path="/pembayaran" element={<PembayaranList />} />
        <Route path="/pembayaran/create" element={<PembayaranCreate />} />
        <Route path="/pembayaran/edit/:id" element={<PembayaranEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
