import styled from "styled-components";

export const ContentCadastro = styled.div`
 width: 100vw;
  height: 100vh;
  background-color: #f3f4f6; /* Cor de fundo clara */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InfoCadastro = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

export const ImgLogo = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    width: 140px;
    height: 140px;
  }
`;

export const TituloCadastro = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

export const FormCadastro = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 16px;
    outline: none;
    
    &:focus {
        border-color: #000; /* Azul escuro */
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }
        @media (min-width: 768px) {
    width: 100%;

    `;
export const DivInput = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  background: #f9f9f9;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #ddd;

  svg {
    color: #999;
    margin-right: 10px;
    font-size: 18px;
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 16px;
    outline: none;
  }
`;

export const ButtonArrow = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  top: 20px;
  left: 20px;
`;

export const LinkLogin = styled.a`
  color: #000; /* Azul escuro */
  font-size: 14px;
  margin-top: 10px;
  text-align: center;

  a {
    color: #ccc; 
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
`;

