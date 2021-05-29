import { message } from "antd";
import { AxiosError } from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { useCancelToken } from "../common/hooks/useCancelToken";
import { useLocations } from "../common/hooks/useLocations";
import { useToken } from "../common/hooks/useToken";
import { SalaryService } from "../services/salary.service";
import { ICreateSalary } from "../types/salary.type";

export const useAddSalary = () => {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const cancelTokenController = useCancelToken();
  const tokenController = useToken();

  const createSalary = (input: ICreateSalary) => {
    const token = tokenController.getToken();
    const cancelToken = cancelTokenController.getAndSet();
    if (!token) return;
    setIsLoading(true);
    SalaryService.create(input, cancelToken, token)
      .then(() => {
        setIsLoading(false);
        history.push("/user/salary/create/thanks-message");
      })
      .catch((err: AxiosError) => {
        setIsLoading(false);
        message.error(
          err.response?.data?.detail || "Unexpected error happened!"
        );
      });
  };

  const locationsController = useLocations();

  return { isLoading, locationsController, createSalary };
};
