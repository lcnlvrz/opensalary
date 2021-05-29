import axios, { AxiosResponse, CancelToken } from "axios";
import { IGeoNamesResponse } from "../types/geonames.interface";

class GeoNamesService {
  static async getCountryOrRegions(
    query: string,
    cancelToken: CancelToken
  ): Promise<AxiosResponse<IGeoNamesResponse>> {
    return axios.get(
      `${
        process.env.REACT_APP_GEONAMES_API
      }/searchJSON?q=${query}&maxRows=10&username=${
        process.env.REACT_APP_GEONAMES_USERNAME || "lcnlvrz"
      }&style=short`,
      { cancelToken }
    );
  }
}

export default GeoNamesService;
