import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import useAuth from "../../hooks/use-auth.js";
import "./NavBar.css";

function NavBar() {
  const { auth, setAuth } = useAuth();
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
  };
  const [isMobile, setIsMobile] = useState(true);
  return (
    <div>
      <header>
        <img src="/logo.png" alt="Advocat Logo" />
        <nav className="nav-bar">
          <button
            className="mobile-menu-icon"
            onClick={() => setIsMobile(!isMobile)}>
            {isMobile ? (
              <i>
                <GiHamburgerMenu />
              </i>
            ) : (
              <i>
                <FaTimes />
              </i>
            )}
          </button>
          <ul
            className={isMobile ? "hidden" : ""}
            onClick={() => setIsMobile(!isMobile)}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {/*<li>
              <Link to="/contact">Contact</Link>
            </li> */}
            {auth.token ? (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/" onClick={handleLogout}>
                    Log Out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
                <li>
                  <Link to="/create-account">Create Account</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default NavBar;
