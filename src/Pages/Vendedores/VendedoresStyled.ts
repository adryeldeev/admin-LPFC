import styled from 'styled-components';

export const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: #f0f0f0;
    `;
export const ContentListaVendedor = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-color: #f0f0f0;
    padding: 20px;
    box-sizing: border-box;
    `;
export const TableVendedores = styled.table`
    width: 80%;
   
    border-collapse: collapse;
    margin: 20px 0;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    @media (max-width: 768px) {
        width: 100%;
    }
    `;
export const Thead = styled.thead`
    background-color: #007bff;
    color: white;
    `;
export const Tr = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
    &:hover {
        background-color: #e0e0e0;
    }
    `;
export const Th = styled.th`
    padding: 10px;
    text-align: left;
    font-weight: bold;
    `;  
export const Td = styled.td`
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    `;
export const Button = styled.button`
    background-color: #007bff; /* Cor de fundo do botão */
    color: white; /* Cor do texto */
    border: none; /* Sem borda */
    padding: 10px 20px; /* Espaçamento interno */
    text-align: center; /* Centraliza o texto */
    text-decoration: none; /* Remove o sublinhado */
    display: inline-block; /* Exibe como bloco em linha */
    font-size: 16px; /* Tamanho da fonte */
    margin: 4px 2px; /* Margem externa */
    cursor: pointer; /* Cursor de ponteiro ao passar o mouse */
    border-radius: 5px; /* Bordas arredondadas */
    transition: background-color 0.3s ease; /* Transição suave para a cor de fundo */
    
    &:hover {
        background-color: #0056b3; /* Cor de fundo ao passar o mouse */
    }
`;
export const ButtonExcluir = styled(Button)`
    background-color: #dc3545; /* Cor de fundo do botão */
    
    &:hover {
        background-color: #c82333; /* Cor de fundo ao passar o mouse */
    }
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: opacity 0.3s ease;
  opacity: 0;
  visibility: hidden;

  &.active {
    opacity: 1;
    visibility: visible;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  width: 400px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    width: 90%;
  }

  h2 {
    margin: 0 0 20px;
    font-size: 24px;
    color: #333;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: #333;
`;

export const IconWrapper = styled.div`
  font-size: 20px;
  color: #007bff;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const ButtonSalvar = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;
export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  `

export const PaginacaoContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

export const BotaoPaginacao = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px; /* Espaçamento entre o ícone e o texto */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  svg {
    font-size: 18px; /* Tamanho do ícone */
  }
`;
