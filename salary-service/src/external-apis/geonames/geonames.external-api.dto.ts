export interface ICountryOrRegionResult {
  lng: string;
  geonameId: number;
  countryCode: string;
  name: string;
  toponymName: string;
  lat: string;
  fcl: string;
  fcode: string;
}

export interface IGeoNamesResponse {
  totalResultsCount: number;
  geonames: ICountryOrRegionResult[];
}
