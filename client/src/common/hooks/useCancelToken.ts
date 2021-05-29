import axios, { CancelToken, CancelTokenSource } from "axios";
import { useEffect, useState } from "react";

export const useCancelToken = () => {
  const [cancelTokenSource, setCancelTokenSource] =
    useState<CancelTokenSource>();

  const getAndSet = (): CancelToken => {
    const cancelToken = axios.CancelToken.source();
    setCancelTokenSource(cancelToken);
    return cancelToken.token;
  };

  useEffect(() => {
    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel();
      }
    };
  }, [cancelTokenSource]);

  return { getAndSet };
};
