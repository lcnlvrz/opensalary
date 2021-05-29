import axios, { AxiosResponse, CancelToken } from "axios";
import {
  ICreateSalary,
  ISalariesResult,
  ISalariesResultPagination,
  ISalaryEntity,
} from "../types/salary.type";

export class SalaryService {
  static async create(
    input: ICreateSalary,
    cancelToken: CancelToken,
    token: string
  ): Promise<AxiosResponse<ISalaryEntity>> {
    return await axios.post(
      `${process.env.REACT_APP_API_GATEWAY}/salary`,
      input,
      {
        cancelToken,
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  static async get(
    token: string,
    cancelToken: CancelToken,
    location: string,
    currency: string,
    occupation: string
  ): Promise<AxiosResponse<ISalariesResult>> {
    return await axios.get(
      `${process.env.REACT_APP_API_GATEWAY}/salary?location=${location}&currency=${currency}&occupation=${occupation}&page=1&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          cancelToken,
        },
      }
    );
  }
  static async getPagination(
    token: string,
    cancelToken: CancelToken,
    location: string,
    currency: string,
    occupation: string,
    page: number,
    company: string
  ): Promise<AxiosResponse<ISalariesResultPagination>> {
    return await axios.get(
      `${process.env.REACT_APP_API_GATEWAY}/salary/pagination?location=${location}&currency=${currency}&occupation=${occupation}&page=${page}&limit=5&company=${company}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          cancelToken,
        },
      }
    );
  }

  static async getOwnSalaries(
    token: string,
    cancelToken: CancelToken
  ): Promise<AxiosResponse<ISalaryEntity[]>> {
    return await axios.get(`${process.env.REACT_APP_API_GATEWAY}/salary/me`, {
      cancelToken,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
