import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  ContentLogin,
  DivInputsLogin,
  DivLinks,
  FormLogin,
  ImgLogo,
  InfoContentLogin,
  InputLogin,
  LinkPassword,
  TitleLogin,
  IconWrapper,
  Text,
} from "./LoginStyled";
import { AiOutlineMail } from "react-icons/ai";
import { TbLockPassword } from "react-icons/tb";
import Logo from '../../assets/Logo2.png'; // Ajuste o caminho se necessário
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import Button from "../../Components/Button/Button";

// Tipagem para o estado de input
interface LoginInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [input, setInput] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const { loginAction, error } = useAuth(); // Acessa o erro do contexto

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [id]: value,
    }));
  };

  const handleSubmitEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginAction(input); // Chama a ação de login
  };

  return (
    <ContentLogin>
      <InfoContentLogin>
        <ImgLogo src={Logo} />
        <TitleLogin>Faça seu login</TitleLogin>
        <FormLogin onSubmit={handleSubmitEvent}>
          <DivInputsLogin>
            <IconWrapper>
              <AiOutlineMail />
            </IconWrapper>
            <InputLogin
              type="email"
              id="email"
              placeholder="Email"
              value={input.email}
              onChange={handleInputChange}
            />
          </DivInputsLogin>
          <DivInputsLogin>
            <IconWrapper>
              <TbLockPassword />
            </IconWrapper>
            <InputLogin
              type="password"
              id="password"
              placeholder="Senha"
              value={input.password}
              onChange={handleInputChange}
            />
          </DivInputsLogin>
       <Button text="Login" type="submit" />
        </FormLogin>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Exibe o erro */}
        <DivLinks>
          <LinkPassword>
            <Text className="text">
              Não tem uma conta? <NavLink to="/cadastrarUser">Crie uma</NavLink>
            </Text>
          </LinkPassword>
          <LinkPassword>
            <NavLink to="/forgot-password">Esqueceu a senha?</NavLink>
          </LinkPassword>
        </DivLinks>
      </InfoContentLogin>
    </ContentLogin>
  );
};

export default Login;
