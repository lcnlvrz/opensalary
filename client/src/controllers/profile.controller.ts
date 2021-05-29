import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { SalaryContext } from "../providers/SalaryProvider";

export const useProfile = () => {
  const contextConsumer = useContext(SalaryContext);
  const authContextConsumer = useContext(AuthContext);

  useEffect(() => {
    if (contextConsumer.getOwnSalaries) {
      contextConsumer.getOwnSalaries();
    }
  }, []);

  return { contextConsumer, authContextConsumer };
};
