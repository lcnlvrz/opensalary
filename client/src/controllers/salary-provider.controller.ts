import { message } from "antd";
import { AxiosError } from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { useCancelToken } from "../common/hooks/useCancelToken";
import { useToken } from "../common/hooks/useToken";
import { SalaryService } from "../services/salary.service";
import { ISalariesQueryParams } from "../types/salaries-query-params.type";
import { ISalariesResult, ISalaryEntity } from "../types/salary.type";

export const useSalaryProvider = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPagination, setIsLoadingPagination] = useState(false);
  const [isLoadingOwnSalaries, setIsLoadingOwnSalaries] = useState(false);
  const [ownSalaries, setOwnSalaries] = useState<ISalaryEntity[]>([]);
  const [salariesResult, setSalariesResult] = useState<ISalariesResult>();

  const cancelTokenController = useCancelToken();
  const tokenController = useToken();
  const history = useHistory();

  const getParams = (): ISalariesQueryParams | undefined => {
    const url = new URL(window.location.href);
    const location = url.searchParams.get("location");
    const occupation = url.searchParams.get("occupation");
    const currency = url.searchParams.get("currency");
    if (!location || !occupation || !currency) return;
    return { location, occupation, currency };
  };

  const getSalariesByQuery = (
    location: string,
    occupation: string,
    currency: string,
    showErrorMessage?: boolean
  ) => {
    const cancelToken = cancelTokenController.getAndSet();
    const token = tokenController.getToken();
    if (!cancelToken || !token) return;
    setIsLoading(true);
    SalaryService.get(token, cancelToken, location, currency, occupation)
      .then((res) => {
        setIsLoading(false);
        setSalariesResult(res.data);
        history.push(
          `/user/salary/results?location=${location}&currency=${currency}&occupation=${occupation}&page=1&limit=5`
        );
      })
      .catch((err: AxiosError) => {
        setIsLoading(false);
        if (showErrorMessage) {
          message.error(
            err.response?.data?.detail || "Unexpected error happened!"
          );
        }
      });
  };

  const updateSalariesPagination = (
    location: string,
    occupation: string,
    currency: string,
    page: number,
    company: string
  ) => {
    const cancelToken = cancelTokenController.getAndSet();
    const token = tokenController.getToken();
    if (!cancelToken || !token) return;
    setIsLoadingPagination(true);
    SalaryService.getPagination(
      token,
      cancelToken,
      location,
      currency,
      occupation,
      page,
      company
    )
      .then((res) => {
        setIsLoadingPagination(false);

        setSalariesResult((prevState) =>
          prevState
            ? { ...prevState, salaries: res.data.items, meta: res.data.meta }
            : undefined
        );
      })
      .catch((err: AxiosError) => {
        setIsLoadingPagination(false);
        message.error(
          err.response?.data?.detail || "Unexpected error happened!"
        );
      });
  };

  const getOwnSalaries = () => {
    const token = tokenController.getToken();
    if (!token) return;
    const cancelToken = cancelTokenController.getAndSet();
    setIsLoadingOwnSalaries(true);
    SalaryService.getOwnSalaries(token, cancelToken)
      .then((res) => {
        setIsLoadingOwnSalaries(false);
        setOwnSalaries(res.data);
      })
      .catch((err: AxiosError) => {
        message.error(
          err.response?.data?.detail || "Unexpected error happened!"
        );
        setIsLoadingOwnSalaries(false);
      });
  };

  return {
    getSalariesByQuery,
    getParams,
    updateSalariesPagination,
    getOwnSalaries,
    ownSalaries,
    isLoadingPagination,
    isLoadingOwnSalaries,
    isLoading,
    salariesResult,
  };
};
