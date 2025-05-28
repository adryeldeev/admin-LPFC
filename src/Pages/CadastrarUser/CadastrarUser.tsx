import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { TbLockPassword } from "react-icons/tb";
import Logo from "../../assets/Logo2.png";
import { Link } from "react-router-dom";
import {
  ContentCadastro,
  DivInput,
  FormCadastro,
  ImgLogo,
  InfoCadastro,
  TituloCadastro,
  LinkLogin,
  Input
} from "./CadastrarUserStyled";
import axios from "axios";
import Button from "../../Components/Button/Button";

// Tipagem do form
interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string; // ✅ usado só para validação
}

const CadastrarUser = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // ✅ manter no estado
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ Validação de senha igual
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      formData.password !== formData.confirmPassword
    ) {
      setError("Todos os campos são obrigatórios e as senhas devem ser iguais");
      return;
    }

    setError("");

    // ✅ Remove confirmPassword antes de enviar
    const { confirmPassword, ...dataToSend } = formData;

    try {
      const response = await axios.post(
        "https://my-first-project-repo-production.up.railway.app/createUser",
        dataToSend,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        navigate("/login");
      } else {
        throw new Error(response.data.message || "Erro ao cadastrar usuário");
      }
    } catch (err: any) {
      console.error("Cadastro falhou:", err);
      const errorMessage = err.response?.data?.message || "Erro ao cadastrar usuário";
      setError(errorMessage);
    }
  };

  return (
    <ContentCadastro>
      <InfoCadastro>
        <ImgLogo src={Logo} alt="Logo" />
        <TituloCadastro>Cadastre-se</TituloCadastro>
        <FormCadastro onSubmit={handleSubmit}>
          <DivInput>
            <FaRegUser />
            <Input
              type="text"
              placeholder="Digite seu nome"
              id="username"
              value={formData.username}
              onChange={handleChange}
            />
          </DivInput>
          <DivInput>
            <AiOutlineMail />
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </DivInput>
          <DivInput>
            <TbLockPassword />
            <Input
              type="password"
              placeholder="Digite sua senha"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </DivInput>
          <DivInput>
            <TbLockPassword />
            <Input
              type="password"
              placeholder="Confirme sua senha"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </DivInput>
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
          <Button text="Cadastrar" type="submit" />
        </FormCadastro>
        <LinkLogin as={Link} to="/login">Já tenho uma conta? Login</LinkLogin>
      </InfoCadastro>
    </ContentCadastro>
  );
};

export default CadastrarUser;
