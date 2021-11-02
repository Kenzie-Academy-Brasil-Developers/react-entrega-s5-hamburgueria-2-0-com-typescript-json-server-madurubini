import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUsers } from "../../providers/User";
import { useHistory } from "react-router";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import {
  FormControl,
  Input,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Button,
  Text,
} from "@chakra-ui/react";
import {
  ButtonsBox,
  Container,
  Form,
  Headers,
  OrComponent,
  SideBorder,
} from "./styles";

interface UserData {
  email: string;
  password: string;
}

const Login = () => {
  const { Login } = useUsers();

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
  } = useForm<UserData>({ resolver: yupResolver(formSchema) });

  const handleData = (data: UserData) => {
    Login(data);
  };
  return (
    <Container>
      <Text fontSize="3xl" fontFamily="monospace">
        H<span>&#127833;</span>T
      </Text>

      <Form onSubmit={handleSubmit(handleData)}>
        <Headers>Login</Headers>
        <FormControl isInvalid={!!errors?.email}>
          <InputGroup my={4}>
            <InputLeftElement
              pointerEvents="none"
              children={<MdAlternateEmail />}
            />
            <Input placeholder="Email" id="email" {...register("email")} />
          </InputGroup>

          <FormErrorMessage> {errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors?.password}>
          <InputGroup my={4}>
            <InputLeftElement
              pointerEvents="none"
              children={<MdLockOutline />}
            />
            <Input
              placeholder="Senha"
              type="password"
              id="password"
              {...register("password")}
            />
          </InputGroup>

          <FormErrorMessage> {errors.password?.message}</FormErrorMessage>
        </FormControl>
        <ButtonsBox>
          <Button width="full" type="submit">
            Login
          </Button>
          <OrComponent>
            <SideBorder />
            <p>OR</p>
            <SideBorder />
          </OrComponent>

          <Button onClick={() => history.push("/register")}>Sign Up</Button>
        </ButtonsBox>
      </Form>
    </Container>
  );
};

export default Login;
