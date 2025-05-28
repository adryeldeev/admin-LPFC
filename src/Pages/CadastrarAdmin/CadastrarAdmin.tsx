import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  ContentCadastro,
  DivInput,
  FormCadastro,
  InfoCadastro,
  LinkLogin,
  TituloCadastro
} from './CadastrarAdminStyled';
import { FaRegUser } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { TbLockPassword } from "react-icons/tb";
import InputField from '../../Components/Input/InputField';
import { Link } from "react-router-dom";
import Button from '../../Components/Button/Button';
import Logo from '../../assets/Logo.webp';
import { toast } from 'react-toastify';
import useApi from '../../Api/Api';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'ADMIN'; // fixo para admin
}

const CadastrarAdmin: React.FC = () => {
  const api = useApi();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'ADMIN',
  });

  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setError('');

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    try {
      const response = await api.post('/create-admin', payload);
      
      if (response.status === 201) {
        toast.success("Administrador cadastrado com sucesso!");
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'ADMIN',
        });
      } else {
        setError("Erro ao cadastrar administrador.");
        
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <ContentCadastro>
      <InfoCadastro>
        <img src={Logo} alt="Logo" style={{ width: "120px", marginBottom: "20px" }} />
        <TituloCadastro>Cadastrar Administrador</TituloCadastro>
        <FormCadastro onSubmit={handleSubmit}>
          <DivInput>
            <FaRegUser />
            <InputField
              type="text"
              placeholder="Digite seu nome"
              id="username"
              value={formData.username}
              onChange={handleChange}
            />
          </DivInput>
          <DivInput>
            <AiOutlineMail />
            <InputField
              type="email"
              placeholder="Digite seu e-mail"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </DivInput>
          <DivInput>
            <TbLockPassword />
            <InputField
              type="password"
              placeholder="Digite sua senha"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </DivInput>
          <DivInput>
            <TbLockPassword />
            <InputField
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
        <LinkLogin as={Link} to="/login">
          Já tenho uma conta? Login
        </LinkLogin>
      </InfoCadastro>
    </ContentCadastro>
  );
};

export default CadastrarAdmin;
