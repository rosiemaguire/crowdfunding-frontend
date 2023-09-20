import { useState } from "react";
import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import useAuth from "../../hooks/use-auth.js";
import useMyProjects from "../../hooks/use-myprojects.js";
import "./NavBar.css";

function NavBar() {
  const { auth, setAuth } = useAuth();
  const [myProjects, myProjectsAreLoading, myProjectsError] = useMyProjects();
  const projectPath = new RegExp(/\/project\/\d+/);
  const updateProjectElement = document.getElementById("update-project-link")
  const {id} = useParams()
  const myProjectIds = [];
  for (let myProject in myProjects) {
    myProjectIds.push(myProjects[myProject]["id"]);
  }

  // // Here we are checking to see if there is an id key in the path, and, if so, if the path also matches the pattern of a project page path
  // if ((id != undefined) && (projectPath.test(window.location.pathname))) {
  //   const isMyProject = myProjectIds.includes(Number(/\d+/.exec(window.location.pathname)[0]));
  //   // Creating the link for the navbar if this is the requesting user's project
  //   if (isMyProject){
  //     console.log(updateProjectElement)
  //     const updateLink = `/update/project/${id}/`
  //     console.log(updateLink)
  //     const newNavLink = document.createElement("a");
  //     newNavLink.setAttribute("href", `${updateLink}`)
  //     newNavLink.innerHTML = "Update Project";
  //     if (!updateProjectElement.hasChildNodes()){
  //       updateProjectElement.appendChild(newNavLink);
  //     }
  //     updateProjectElement.className=""
  //   }
  // } else {
  //   // updateProjectElement.className="hidden"
  // }
  
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
  };
  const [isMobile, setIsMobile] = useState(true);
  return (
    <div>
      <header>
        <img src="/logo.png" alt="Advocat Logo" />
        <nav id="nav-bar" className="nav-bar">
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
            id="nav-links"
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
                <li id="update-project-link" className="hidden">
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
