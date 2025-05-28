import styled from "styled-components";

export const ContentCadastrarVeiculos = styled.div`
 padding: 20px;
 margin-top:20px;
  max-width: 1200px; /* Limita a largura máxima do container */

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const TitleCadastrarVeiculos = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  padding: 0 10px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
export const InfoCadastro = styled.div`
 margin-top: 40px;

`
export const FormCadastrarVeiculos = styled.form`
  display: flex;
  flex-wrap: wrap; /* Permite que os campos quebrem linha */
  gap: 20px; /* Espaçamento entre os campos */
  justify-content: space-between; /* Distribui os campos uniformemente */
    align-items: center;
    margin: 0 auto; /* Centraliza o formulário */
  width: 100%;
  max-width: 1200px; /* Limita a largura máxima do formulário */
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column; /* Empilha os campos em telas menores */
    width: 100%;
    max-width: none;
  }
`;

export const DivInputsCadastrarVeiculos = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 calc(30% - 20px); /* Cada campo ocupa 25% da largura menos o gap */
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;

  @media (max-width: 1024px) {
    flex: 1 1 calc(33.33% - 20px); /* Em telas médias, 3 campos por linha */
  }

  @media (max-width: 768px) {
    flex: 1 1 100%; /* Em telas menores, os campos ocupam 100% da largura */
  }

  &:focus-within {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

export const InputCadastrarVeiculos = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 16px;
  color: #333;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  @media (max-width: 768px) {
    padding: 8px; /* Reduz o padding em telas menores */
    font-size: 14px; /* Tamanho da fonte em telas menores */
  }
`;
export const InputUpload = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 16px;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
    width: 100%; // ocupa toda a largura em telas pequenas
  }
`;

export const IconWrapper = styled.div`
  font-size: 20px;
  color: #007bff;
  margin-right: 10px;
`;

export const ButtonCadastrarVeiculos = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const SelectCadastrarVeiculos = styled.select`
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
`;
