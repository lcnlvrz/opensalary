import { message } from "antd";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCancelToken } from "../common/hooks/useCancelToken";
import { useFixViewPort } from "../common/hooks/useFixViewport";
import { AuthContext } from "../providers/AuthProvider";
import { LocalStorageService } from "../services/local-storage.service";
import { IAuthenticateUserInput, UserService } from "../services/user.service";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const cancelTokenController = useCancelToken();
  const authenticationConsumer = useContext(AuthContext);
  const authenticateUserAPI = (input: IAuthenticateUserInput) => {
    setIsLoading(true);
    const axiosToken = cancelTokenController.getAndSet();
    UserService.authenticateUser(input, axiosToken)
      .then((res) => {
        setIsLoading(false);
        LocalStorageService.setToken(res.data.accessToken);
        LocalStorageService.setExternalUserId(
          res.data.user.socialMediaRegister?.externalId || ""
        );
        if (authenticationConsumer.authenticateUser) {
          authenticationConsumer.authenticateUser({
            email: res.data.user.email,
            name: res.data.user.name,
            picture: "",
          });
        }
      })
      .catch((err: AxiosError) => {
        message.error(
          err.response?.data?.detail || "Unexpected error happened!"
        );
      });
  };

  const registerUserLocal = (email: string, password: string, name: string) => {
    const axiosToken = cancelTokenController.getAndSet();
    setIsLoading(true);
    UserService.register(email, name, password, axiosToken)
      .then((res) => {
        setIsLoading(false);
        LocalStorageService.setToken(res.data.accessToken);
        if (authenticationConsumer.authenticateUser) {
          authenticationConsumer.authenticateUser({
            email: res.data.user.email,
            name: res.data.user.name,
            picture: "",
          });
        }
      })
      .catch((err: AxiosError) => {
        setIsLoading(false);
        message.error(
          err.response?.data?.detail || "Unexpected error happened!"
        );
      });
  };

  useEffect(() => {
    if (!authenticationConsumer.isLoading && authenticationConsumer?.data) {
      history.push("/user/home");
    }
  }, [authenticationConsumer.data]);

  return { isLoading, authenticateUserAPI, registerUserLocal };
};
