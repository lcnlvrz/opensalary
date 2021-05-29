import { useContext, useEffect, useState } from "react";
import { SalaryContext } from "../providers/SalaryProvider";

export const useSalariesResult = () => {
  const contextConsumer = useContext(SalaryContext);
  const [queryCompany, setQueryCompany] = useState({
    touched: false,
    value: "",
  });

  useEffect(() => {
    if (contextConsumer.getParams && contextConsumer.getSalariesByQuery) {
      const params = contextConsumer.getParams();
      if (!params) return;
      contextConsumer.getSalariesByQuery(
        params.location,
        params.occupation,
        params.currency
      );
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        contextConsumer.updateSalariesPagination &&
        contextConsumer.getParams &&
        queryCompany.touched
      ) {
        const params = contextConsumer.getParams();
        if (!params) return;
        contextConsumer.updateSalariesPagination(
          params.location,
          params.occupation,
          params.currency,
          1,
          queryCompany.value
        );
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [queryCompany]);

  return { contextConsumer, setQueryCompany, queryCompany };
};
