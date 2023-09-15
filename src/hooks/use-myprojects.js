import { useState, useEffect } from "react";
// import { useContext } from "react";
// import useAuth from "./use-auth";

import getMyProjects from "../api/get-myprojects";

export default function useMyProjects() {
  // const { auth } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getMyProjects()
    .then((projects) => {
      setProjects(projects);
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error);
      setIsLoading(false);
    });
  }, []);

  return [projects, isLoading, error ];
} 