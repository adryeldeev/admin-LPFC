import styled from "styled-components";

export const ButtonField = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 10px 20px;
  background-color:#1a1a1a;
  color: #fff;
  border: 1px solid #ccc;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;

  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  transition: background 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #2a2a2a; /* preto puxado pro cinza */
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    background-color: #111; /* preto mais suave */
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;
