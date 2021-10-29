import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUsers } from "../../providers/User";
import { useHistory } from "react-router";

interface UserData {
  email: string;
  password: string;
}

const Login = () => {
  const { Login, authToken } = useUsers();
  const history = useHistory();

  const formSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup
      .string()
      .required("Senha é obrigatória")
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: yupResolver(formSchema),
  });

  const handleData = (data: UserData) => {
    Login(data);
  };
  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(handleData)}>
        <input placeholder="Email" {...register("email")} />
        {errors.email?.message}
        <input placeholder="Senha" type="password" {...register("password")} />
        {errors.password?.message}
        <button type="submit">Login</button>
      </form>

      <p>OR</p>
      <button onClick={() => history.push("/register")}>Sign Up</button>
    </>
  );
};

export default Login;
