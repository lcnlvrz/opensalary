import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { LocalStorageService } from "../../services/local-storage.service";

export const useToken = () => {
  const consumerContext = useContext(AuthContext);

  const getToken = (): string | null => {
    const token = LocalStorageService.getToken();
    if (!token && consumerContext.logoutUser) {
      consumerContext.logoutUser();
      return null;
    } else {
      return token;
    }
  };

  return { getToken };
};
