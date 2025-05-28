import styled from "styled-components";

export const ContentCadastrarMarcas = styled.div`
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
`;
export const Form = styled.form`
  display: flex;
  gap: 1rem;
        margin-top: 1rem;
    width: 300px;
@media (max-width: 768px) {
    width: 100%;
    flex-direction:column;
    }
  


`;
export const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media (max-width: 768px) {
    width: 100%;
    }
  }
`;
export const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;
export const Input = styled.input`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  @media (max-width: 768px) {
    padding: 0.4rem;
    font-size: 0.9rem;
  }
`;
export const ButtonSalvar = styled.button`
  background-color: #0d6efd;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;
