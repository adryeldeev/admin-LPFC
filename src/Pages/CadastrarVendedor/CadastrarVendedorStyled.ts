import styled from 'styled-components';

export const ContentCadastrarVendedor = styled.div`
  padding: 20px;
  max-width: 1200px; /* Limita a largura máxima do container */
  margin: 0 auto; /* Centraliza o container */
  background-color: #f9f9f9; /* Cor de fundo do container */
  border-radius: 8px; /* Bordas arredondadas */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
  
  @media (max-width: 768px) {
    height: auto;
    padding: 10px; /* Reduz o padding em telas menores */
  }
`;
export const DivInputsCadastrarVendedor = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
    @media (max-width: 768px) {
    flex-direction: column; /* Alinha os campos verticalmente */
    gap: 10px; /* Espaçamento entre os campos */
    width: 100%; /* Largura total em telas menores */
    padding: 10px; /* Reduz o padding em telas menores */
  }
`;
export const FormCadastrarVendedor = styled.form`
margin-top: 20px; /* Espaçamento superior do formulário */
  display: flex;
  gap: 20px; /* Espaçamento entre os campos */
  justify-content: center; /* Centraliza os campos */
  align-items: center; /* Centraliza os campos */
  width: 100%;
  max-width: 600px; /* Limita a largura máxima do formulário */
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 100%; /* Largura total em telas menores */
    max-width: none; /* Remove o limite de largura */
    padding: 10px; /* Reduz o padding em telas menores */
  }
`;
export const IconWrapper = styled.div`
 font-size: 20px;
  color: #007bff;
  margin-right: 10px;
  @media (max-width: 768px) {
    font-size: 16px; /* Tamanho do ícone em telas menores */
    margin-right: 5px; /* Espaçamento reduzido em telas menores */
  }
`
export const InputCadastrarVendedor = styled.input`
    flex: 1; /* Permite que o input ocupe o espaço restante */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%; /* Largura total do input */
    transition: border-color 0.3s ease;
    
    &:focus {
        border-color: #007bff; /* Cor do contorno ao focar */
        outline: none; /* Remove o contorno padrão */
    }
        @media (max-width: 768px) {
    padding: 8px; /* Reduz o padding em telas menores */
    font-size: 14px; /* Tamanho da fonte em telas menores */
    width: 100%; /* Largura total em telas menores */
    }
    `;
export const ButtonCadastrarVendedor = styled.button`
    background-color: #007bff; /* Cor de fundo do botão */
    color: white; /* Cor do texto do botão */
    border: none; /* Remove a borda padrão */
    border-radius: 4px; /* Bordas arredondadas */
    padding: 10px 20px; /* Espaçamento interno do botão */
    cursor: pointer; /* Muda o cursor ao passar sobre o botão */
    font-size: 16px; /* Tamanho da fonte */
    transition: background-color 0.3s ease; /* Transição suave para a cor de fundo */
    
    &:hover {
        background-color: #0056b3; /* Cor de fundo ao passar o mouse */
    }
        @media (max-width: 768px) {
    padding: 8px 16px; /* Reduz o padding em telas menores */
    font-size: 14px; /* Tamanho da fonte em telas menores */
    }
    `;


