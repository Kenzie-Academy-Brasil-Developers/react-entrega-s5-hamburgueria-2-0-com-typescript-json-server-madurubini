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
}

const UserContext = createContext<UserProviderData>({} as UserProviderData);

export const UserProvider = ({ children }: UserProps) => {
  const history = useHistory();

  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("token") || ""
  );

  const Login = (data: UserData) => {
    api
      .post(`login`, data)
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("user", res.data.user.id);
        setAuthToken(res.data.accessToken);
        console.log(authToken);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const Logout = () => {
    localStorage.clear();
    setAuthToken("");
    history.push("/");
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
      })
      .catch((err) => console.log(err));
  };

  return (
    <UserContext.Provider value={{ authToken, Login, Logout, Register }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
