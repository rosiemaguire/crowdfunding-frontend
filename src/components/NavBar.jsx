import { Link, Outlet } from "react-router-dom";
import "./NavBar.css"

function NavBar() {
  return (
    <div className="nav-bar">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/project">Project</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;