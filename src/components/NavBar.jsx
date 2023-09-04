import { Link, Outlet } from "react-router-dom";
import "./NavBar.css"

function NavBar() {
  return (
    <div>
      <header>
        <img src="public\logo.png" alt="Advocat Logo" />
      <nav className="nav-bar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default NavBar;