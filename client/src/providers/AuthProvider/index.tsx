import { Spin } from "antd";
import React, { createContext } from "react";
import { useAuthProvider } from "../../controllers/auth-provider.controller";
import { IAuthContext } from "../../types/authentication.type";

export const AuthContext = createContext<Partial<IAuthContext>>({});

export const AuthProvider = (props: { children: any }) => {
  const controller = useAuthProvider();

  return (
    <AuthContext.Provider
      value={{
        data: controller.user,
        isLoading: controller.isLoading,
        logoutUser: controller.logoutUser,
        authenticateUser: controller.authenticateUser,
      }}
    >
      {controller.isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        props.children
      )}
    </AuthContext.Provider>
  );
};
