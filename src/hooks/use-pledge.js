import { useState, useEffect } from "react";
import getPledge from "../api/get-pledge";

export default function usePledge(pledgeId) {
  const [pledge, setPledge] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getPledge(pledgeId) 
    .then((pledge) => {
      setPledge(pledge);
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error);
      setIsLoading(false);
    });
  }, [pledgeId]);
  
  return { pledge, isLoading, error };
}