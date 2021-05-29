import axios, { AxiosResponse, CancelToken } from "axios";
import { IDataWorkResponse } from "../types/datawork.type";

class DataWorkService {
  static async getJobsTitles(
    query: string,
    cancelToken: CancelToken
  ): Promise<AxiosResponse<IDataWorkResponse[]>> {
    return axios.get(
      `${process.env.REACT_APP_DATAWORK_API}autocomplete?begins_with=${query}`,
      { cancelToken }
    );
  }
}

export default DataWorkService;
