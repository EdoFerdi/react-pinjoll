import React, { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Loader from "./components/Loader"; // Loader Component
import ProtectedRoute from "./components/ProtectedRoute"; // ProtectedRoute Component
import Logout from "./components/Logout";

const Home = React.lazy(() => import("./components/Home"));
const OrangList = React.lazy(() => import("./components/Orang/List"));
const OrangCreate = React.lazy(() => import("./components/Orang/Create"));
const OrangEdit = React.lazy(() => import("./components/Orang/Edit"));
const PinjamanList = React.lazy(() => import("./components/Pinjaman/List"));
const PinjamanCreate = React.lazy(() => import("./components/Pinjaman/Create"));
const PinjamanEdit = React.lazy(() => import("./components/Pinjaman/Edit"));
const PembayaranList = React.lazy(() => import("./components/Pembayaran/List"));
const PembayaranCreate = React.lazy(() => import("./components/Pembayaran/Create"));
const PembayaranEdit = React.lazy(() => import("./components/Pembayaran/Edit"));
const Login = React.lazy(() => import("./components/Login"));

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken")); // Ambil token dari localStorage

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            <h2>Pinjol</h2>
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
              <li className="nav-item">
                <NavLink to="/home" className="nav-link">
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
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <Suspense fallback={<Loader />}>
          {/* Suspense untuk fallback saat loading */}
          <Routes>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />{" "}
            {/* Route ke halaman Home */}
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/orang"
              element={
                <ProtectedRoute>
                  <OrangList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orang/create"
              element={
                <ProtectedRoute>
                  <OrangCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orang/edit/:id"
              element={
                <ProtectedRoute>
                  {" "}
                  <OrangEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pinjaman"
              element={
                <ProtectedRoute>
                  <PinjamanList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pinjaman/create"
              element={
                <ProtectedRoute>
                  <PinjamanCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pinjaman/edit/:id"
              element={
                <ProtectedRoute>
                  <PinjamanEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pembayaran"
              element={
                <ProtectedRoute>
                  <PembayaranList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pembayaran/create"
              element={
                <ProtectedRoute>
                  <PembayaranCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pembayaran/edit/:id"
              element={
                <ProtectedRoute>
                  <PembayaranEdit />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};
export default App;
