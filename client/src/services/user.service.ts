import axios, { AxiosResponse, CancelToken } from "axios";
import { IAbstractEntity } from "../common/abstract.type";

export interface IAuthenticateUserInput {
  email: string;
  name: string;
  picture: string;
  externalId: string;
}

export interface IAuthenticateUserOutput {
  accessToken: string;
  user: {
    email: string;
    name: string;
    socialMediaRegister?: { externalId: string };
  };
}

export interface ISocialMediaRegister extends IAbstractEntity {
  externalId: string;
}

export interface IGetUserOutput extends IAbstractEntity {
  name: string;
  email: string;
  socialMediaRegister?: ISocialMediaRegister;
}

export class UserService {
  static async authenticateUser(
    input: IAuthenticateUserInput,
    cancelToken: CancelToken
  ): Promise<AxiosResponse<IAuthenticateUserOutput>> {
    return await axios.post(
      `${process.env.REACT_APP_API_GATEWAY}/user/social-media`,
      input,
      { cancelToken }
    );
  }

  static async getUser(
    token: string,
    cancelToken: CancelToken
  ): Promise<AxiosResponse<IGetUserOutput>> {
    return await axios.get(`${process.env.REACT_APP_API_GATEWAY}/user/me`, {
      cancelToken,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async register(
    email: string,
    name: string,
    password: string,
    cancelToken: CancelToken
  ): Promise<AxiosResponse<IAuthenticateUserOutput>> {
    return await axios.post(
      `${process.env.REACT_APP_API_GATEWAY}/user/local`,
      { email, password, name },
      { cancelToken }
    );
  }
}
