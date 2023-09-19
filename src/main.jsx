// Import Modules
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import Components
import NavBar from "./components/NavBar/NavBar.jsx";
import { AuthProvider } from "./components/AuthProvider/AuthProvider.jsx";

// Import Pages
import HomePage from "./pages/HomePage/HomePage.jsx";
import ProjectPage from "./pages/ProjectPage/ProjectPage.jsx";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import ContactPage from "./pages/ContactPage/ContactPage.jsx";
import NewUserPage from "./pages/NewUserPage/NewUserPage.jsx";
import NewProjectPage from "./pages/NewProjectPage/NewProjectPage.jsx";
import NewPledgePage from "./pages/NewPledgePage/NewPledgePage.jsx";
import UserPage from "./pages/UserProfilePage/UserProfilePage.jsx";
import ProjectUpdatePage from "./pages/ProjectUpdatePage/ProjectUpdatePage.jsx";
import UserUpdatePage from "./pages/UserUpdatePage/UserUpdatePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/project/:id", element: <ProjectPage /> },
      { path: "/update/project/:id", element: <ProjectUpdatePage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/login", element: <LoginPage/> },
      { path: "/about", element: <AboutPage/> },
      { path: "/contact", element: <ContactPage />},
      { path: "/create-account", element: <NewUserPage />},
      { path: "/new-project", element: <NewProjectPage />},
      { path: "/pledges", element: <NewPledgePage />},
      { path: "/profile", element: <UserPage />},
      { path: "/profile/update", element: <UserUpdatePage />}
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </ AuthProvider>
  </React.StrictMode>
);
