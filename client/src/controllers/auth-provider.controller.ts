import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useGoogleLogout } from "react-google-login";
import { useCancelToken } from "../common/hooks/useCancelToken";
import { LocalStorageService } from "../services/local-storage.service";
import { UserService } from "../services/user.service";
import { IAuthentication } from "../types/authentication.type";

export const useAuthProvider = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IAuthentication>();

  const cancelTokenController = useCancelToken();

  const authenticateUser = (input: IAuthentication) => setUser(input);

  const { signOut, loaded } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || "",
  });

  const logoutUser = () => {
    LocalStorageService.removeExternalId();
    LocalStorageService.removeToken();
    if (signOut) signOut();
    if (window.FB) window.FB.logout();
    setUser(undefined);
  };

  const authenticateUserAPI = () => {
    const token = LocalStorageService.getToken();
    if (!token) {
      return setIsLoading(false);
    }
    const axiosToken = cancelTokenController.getAndSet();
    UserService.getUser(token, axiosToken)
      .then((res) => {
        setUser({
          email: res.data.email,
          name: res.data.name,
          picture: "",
        });
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    authenticateUserAPI();
  }, []);

  return { user, authenticateUser, isLoading, logoutUser };
};
