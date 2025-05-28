import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

export const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
    padding: 10px 20px;
  background-color: #fff;
  color: #000;
  border: 1px solid  #e30613;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
  margin-top:1rem;




  
  &:hover {
   background-color: #e30613;
  color: white;
  }
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
    }
    @media (max-width: 768px) {
        width: 100%;
        padding: 10px;
    }
    }
`