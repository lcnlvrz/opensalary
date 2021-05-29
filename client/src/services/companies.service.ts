import axios, { AxiosResponse, CancelToken } from "axios";
import { ICompaniesResponse } from "../types/companies.type";

export class CompaniesService {
  static async getManyByQuery(
    query: string,
    cancelToken: CancelToken
  ): Promise<AxiosResponse<ICompaniesResponse[]>> {
    return await axios.get(
      `${process.env.REACT_APP_GLASSDOR_API}/find.htm?autocomplete=true&maxEmployersForAutocomplete=10&term=${query}&gdToken=undefined`,
      { cancelToken }
    );
  }
}
