import { useState, useEffect } from "react";
import getMyPledges from "../api/get-mypledges";

export default function useMyPledges() {
  const [pledges, setPledges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getMyPledges()
    .then((pledges) => {
      setPledges(pledges);
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error);
      setIsLoading(false);
    });
  }, []);

  return [pledges, isLoading, error ];
} 