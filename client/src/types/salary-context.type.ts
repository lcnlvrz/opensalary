import { ISalariesQueryParams } from "./salaries-query-params.type";
import { ISalariesResult, ISalaryEntity } from "./salary.type";

export interface ISalaryContext {
  salariesResult: ISalariesResult;
  ownSalaries: ISalaryEntity[];
  isLoading: boolean;
  isLoadingPagination: boolean;
  isLoadingOwnSalaries: boolean;
  getSalariesByQuery: (
    location: string,
    occupation: string,
    currency: string,
    showErrorMessage?: boolean
  ) => void;
  getParams: () => ISalariesQueryParams | undefined;
  updateSalariesPagination: (
    location: string,
    occupation: string,
    currency: string,
    page: number,
    company: string
  ) => void;
  getOwnSalaries: () => void;
}
