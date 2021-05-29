import { useContext } from "react";
import { useHistory } from "react-router";
import { useLocations } from "../common/hooks/useLocations";
import { SalaryContext } from "../providers/SalaryProvider";

export const useHome = () => {
  const locationsController = useLocations();
  const contextConsumer = useContext(SalaryContext);

  const history = useHistory();

  return { locationsController, contextConsumer, history };
};
