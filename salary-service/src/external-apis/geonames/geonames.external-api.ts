import axios, { AxiosResponse, CancelToken } from 'axios';
import { IGeoNamesResponse } from './geonames.external-api.dto';

export class GeonamesExternalApi {
  static async getCountryOrRegions(
    query: string,
  ): Promise<AxiosResponse<IGeoNamesResponse>> {
    return axios.get(
      `${
        process.env.REACT_APP_GEONAMES_API
      }/searchJSON?q=${query}&maxRows=10&username=${
        process.env.REACT_APP_GEONAMES_USERNAME || 'lcnlvrz'
      }&style=short`,
    );
  }
}
