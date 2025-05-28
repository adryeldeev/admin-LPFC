import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {  Card, Container, Input, InputWrapper, Link } from "./resetPasswordStyled";
import { TbLockPassword } from "react-icons/tb";
import useApi from "../../Api/Api";
import Button from "../../Components/Button/Button";
export const ResetPassword = () => {
    const api = useApi()
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
  
    const handleResetPassword = async () => {
      if (!token) {
        alert("Token inválido ou expirado.");
        return;
      }
  
      if (newPassword !== confirmPassword) {
        alert("As senhas devem ser iguais.");
        return;
      }
  
      try {
       const response = await api.post('/resetpassword', { token, newPassword, confirmNewPassword: confirmPassword });
       if(response.status === 200 || response.status === 201){

           alert("Senha redefinida com sucesso!");
           navigate("/login");
        }else{
           alert("Erro ao redefinir a senha.");
        }
      } catch (error) {
        alert("Erro ao redefinir a senha.");
      }
    };
  
    return (
      <Container>
        <Card>
          <h2>Redefinir Senha</h2>
          <p>Digite sua nova senha.</p>
          <InputWrapper>
            <TbLockPassword /> 
            <Input
              type="password"
              placeholder="Nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <TbLockPassword /> 
            <Input
              type="password"
              placeholder="Confirme a nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </InputWrapper>
          <Button onClick={handleResetPassword} text="Redefinir Senha"/>
          <Link href="/login">Já tem uma conta? Login</Link>
        </Card>
      </Container>
    );
  };