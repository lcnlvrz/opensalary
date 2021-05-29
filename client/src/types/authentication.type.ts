export interface IAuthentication {
  name: string;
  email: string;
  picture: string;
}

export interface IAuthContext {
  isLoading: boolean;
  data: IAuthentication;
  authenticateUser: (input: IAuthentication) => void;
  logoutUser: () => void;
}
