import styled from "styled-components";

export const CarrosContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  h1{
  
    text-align: start;
    margin-left:120px;
    font-size: 24px;
    color: #333;

  
  }
    @media (max-width: 768px) {
    padding: 10px;
    margin: 0 auto;
    h1{
      text-align: center;
      margin-left:0px;
      font-size: 20px;
    }
  }
  }

`;

export const DivAdd = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ListaCarrosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px;
    margin: 0 auto;
  }


`;

export const CarroCard = styled.div`
  width: 300px;
  height: 350px;
  background: #f5f5f5;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  transition: 0.3s;
  padding: 1rem;
  text-align: center;

  &:hover .actions {
    bottom: 10px;
    opacity: 1;
  }



  img {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
  }
  h3 {
    font-size: 1.1rem;
    margin: 0;
  }
  p {
    font-size: 1rem;
    margin: 0;
  }


  
    @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 10px;
    }
    @media (max-width: 480px) {
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 5px;
    }
`;

export const CarroImagem = styled.div`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  @media (max-width: 768px) {
    width: 100%;
    height: 150px;
  }
`;

export const CarroInfo = styled.div`
  margin-top: 10px;
  text-align: center;

  h3 {
    font-size: 18px;
    color: #333;
  }

  p {
    font-size: 14px;
    color: #666;
  }
    @media (max-width: 768px) {
    h3 {
      font-size: 16px;
    }
    p {
      font-size: 12px;
    }
  }
`;

export const PaginacaoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
`;

export const BotaoPaginacao = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 14px;
  }
`;
export const CarroSliderWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 8px;

  .slick-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
    @media (max-width: 768px) {
    width: 100%;
    height: 150px;
  }
`;
export const CardActions = styled.div`
  position: absolute;
  bottom: -50px;
  left: 0;
  right: 0;
  opacity: 0;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  gap: 10px;

  &.actions {
    z-index: 10;
  }

  button {
    background-color: #dc3545;
    border: none;
    padding: 0.3rem 0.7rem;
    color: white;
    border-radius: 5px;
    cursor: pointer;

    &:first-child {
      background-color: #ffc107;
      color: black;
    }
  }
    @media (max-width: 768px) {
    bottom: -30px;
    padding: 0.2rem 0.5rem;
    font-size: 12px;
  }

`;
export const BotaoAdicionar = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
    @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 14px;
  }
`;


export const BotaoSalvar = styled.button`
background-color: #28a745;
color: white;
border: none;
border-radius: 4px;
padding: 10px 20px;
font-size: 16px;
cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
    }
    @media (max-width: 768px) {
      padding: 5px 10px;
      font-size: 14px;
      }
      `;
      
      export const BotaoCancelar = styled.button`
      background-color: #6c757d;
      margin-left: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a6268;
  }
    @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 14px;
  }
`;
interface ModalContainerProps {
  open: boolean;
}

export const ModalContainer = styled.div<ModalContainerProps>`
  display: ${({ open }) => (open ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 10px;
    margin: 0 auto;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  max-width: 950px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
.form-fields {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    justify-content: space-between;
    @media (max-width: 768px) {
     max-height: 400px; // Limita a altura máxima do modal
    overflow-y: auto;      // Só os campos rolam
    }
  }
  .form-group {
    flex: 1 1 22%;
    min-width: 180px;
    max-width: 240px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  input, select, textarea {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
    color: #333;
    margin-top: 4px;
  }
  @media (max-width: 1024px) {
    .form-group {
      flex: 1 1 30%;
    }
  }
  @media (max-width: 768px) {
    .form-fields {
      flex-direction: column;
    }
    .form-group {
      flex: 1 1 100%;
      max-width: none;
    }
  }
  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
  p {
    margin-bottom: 20px;
    font-size: 16px;
    color: #666;
  }
 
    
  
    
  

  `;
export const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

