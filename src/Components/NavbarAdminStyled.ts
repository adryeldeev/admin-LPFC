import styled from "styled-components";

export const ContentNavDiv = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 10px 20px;
   
  }
`;

export const Nav = styled.nav`
  box-sizing: border-box; // Importante
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0 auto;
  padding: 10px 40px;
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;



  @media (max-width: 768px) {
    position: fixed;
    width: 100%;
    max-width: 100%;
    padding: 10px 16px; // padding menor
  }
`;

export const NavList = styled.ul`
    display: flex;
    list-style: none;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    padding: 0;
    margin: 0;
    gap: 20px;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      display: none; /* Esconde o menu em telas menores */
        }
        `
export const NavItem = styled.li`
    margin: 0 10px;
    font-size: 1.2em;
    color: white;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
    @media (max-width: 768px) {
        margin: 5px 0;
        font-size: 1em;
        }
        `
export const NavLink = styled.a`
    color: white;
    text-decoration: none;
     background-color: transparent;
         border:none;
         padding:0;
           font-size: 0.9em;
        font-weight: bold;
         cursor:pointer;
     &:hover {
        text-decoration: underline;
    }
    @media (max-width: 768px) {
        font-size: 0.9em;
        }
        `;


        export const ButtonLink = styled.button`
        background-color: transparent;
        border: none;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        padding: 10px 15px;
        text-decoration: none;
      
      
        &:hover {
          color: #007bff;
        }
          @media (max-width: 768px) {
            font-size: 14px;
            padding: 8px 12px;
          }
      `;
      export const AdminDropdown = styled.div`
  position: relative;
  display: inline-block;

  &:hover > div {
    display: block;
  }
   
`;

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: 160px;
  z-index: 1000;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  top: 100%;
  right: 0;

  a {
    color: #000;
    padding: 10px 15px;
    display: block;
    text-decoration: none;

    &:hover {
      background-color: #f5f5f5;
    }
  }
`;
    
 export const DropdownMenu = styled.div`
  position: fixed; /* Mudança importante */
  top: 60px; /* altura logo abaixo da navbar */
  right: 30px;
  left: 30px;
  background-color: #000;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: calc(100vw - 60px);
  max-width: 400px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 3;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 5px 0;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;
    export const Logo = styled.img`
        width: 70px;
        height: 70px;
        margin-right: 20px;
        border-radius: 15%;
        @media (max-width: 768px) {
            width: 40px;
            height: 40px;
            margin-right: 10px;
            }
            `
    export const MenuIcon = styled.div`
        display: none; /* Esconde o ícone do menu em telas maiores */
        font-size: 2em;
        padding: 20px;
        cursor: pointer;
        @media (max-width: 768px) {
            display: block; /* Mostra o ícone do menu em telas menores */
            }
            `;
            export const DropdownMenuList = styled.ul`
      display: none; /* Esconde o menu dropdown por padrão */
      list-style: none;
      padding: 20px;
      padding: 0;
      margin: 0;
      gap: 10px;
      flex-direction: column;
    
      @media (max-width: 768px) {
        display: flex; /* Mostra o menu dropdown em telas menores */
      }
    `;