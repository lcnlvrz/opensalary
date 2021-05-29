import { createContext } from "react";
import { useSalaryProvider } from "../../controllers/salary-provider.controller";
import { ISalaryContext } from "../../types/salary-context.type";

export const SalaryContext = createContext<Partial<ISalaryContext>>({});

export const SalaryProvider = (props: { children: any }) => {
  const controller = useSalaryProvider();

  return (
    <SalaryContext.Provider
      value={{
        isLoadingOwnSalaries: controller.isLoadingOwnSalaries,
        getOwnSalaries: controller.getOwnSalaries,
        isLoading: controller.isLoading,
        ownSalaries: controller.ownSalaries,
        salariesResult: controller.salariesResult,
        getSalariesByQuery: controller.getSalariesByQuery,
        getParams: controller.getParams,
        updateSalariesPagination: controller.updateSalariesPagination,
        isLoadingPagination: controller.isLoadingPagination,
      }}
    >
      {props.children}
    </SalaryContext.Provider>
  );
};
