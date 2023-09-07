import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import "./NavBar.css";

function NavBar() {
  const [isMobile, setIsMobile] = useState(false);
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
                <FaTimes />{" "}
              </i>
            ) : (
              <i>
                <GiHamburgerMenu />
              </i>
            )}
          </button>
          <ul
            className={isMobile ? "" : "hidden"}
            onClick={() => setIsMobile(false)}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default NavBar;
