import { useToast } from "@chakra-ui/toast";
import { createContext, ReactNode, useContext, useState } from "react";
import { useHistory } from "react-router";
import api from "../../services/api";

interface UserData {
  email: string;
  password: string;
}

interface UserProps {
  children: ReactNode;
}

interface UserProviderData {
  authToken: string;
  Login: (data: UserData) => void;
  Logout: () => void;
  Register: (data: UserData) => void;
  userInfo: any;
}

const UserContext = createContext<UserProviderData>({} as UserProviderData);

export const UserProvider = ({ children }: UserProps) => {
  const toast = useToast();

  const history = useHistory();

  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("token") || ""
  );

  const [userInfo, setUserInfo] = useState(
    () => localStorage.getItem("user") || ""
  );

  const Login = (data: UserData) => {
    api
      .post(`login`, data)
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("user", res.data.user.id);
        setAuthToken(res.data.accessToken);
        setUserInfo(res.data.user.id);
        toast({
          title: "Success Login",
          status: "success",
          isClosable: true,
          position: "top",
          variant: "left-accent",
        });
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Try again, check your info",
          status: "error",
          isClosable: true,
          position: "top",
          variant: "left-accent",
        });
      });
  };

  const Logout = () => {
    localStorage.clear();
    setAuthToken("");
    history.push("/");
    toast({
      title: "Success Logout",
      status: "info",
      isClosable: true,
      position: "top",
    });
  };

  const Register = (data: UserData) => {
    api
      .post(`/register`, data)
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("user", res.data.user.id);
        setAuthToken(res.data.accessToken);
        console.log(authToken);
        history.push("/");
        toast({
          title: "Account created",
          status: "success",
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) =>
        toast({
          title: "Try again, check your info",
          status: "error",
          isClosable: true,
          position: "top",
          variant: "left-accent",
        })
      );
  };

  return (
    <UserContext.Provider
      value={{ authToken, Login, Logout, Register, userInfo }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
