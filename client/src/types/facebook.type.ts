export interface IFacebook {
  accessToken: string;
  data_access_expiration_time: number;
  email: string;
  expiresIn: number;
  graphDomain: string;
  id: string;
  name: string;
  picture: { data: { url: string } };
  signedRequest: string;
  userID: string;
  status: string;
}
