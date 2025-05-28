import React, { useEffect, useRef, useState } from 'react';
import {
  AdminDropdown,
  ButtonLink,
  ContentNavDiv,
  DropdownContent,
  DropdownMenu,
  DropdownMenuList,
  Logo,
  MenuIcon,
  Nav,
  NavItem,
  NavLink,
  NavList,
} from './NavbarAdminStyled';
import { useNavigate } from 'react-router-dom';
import Logo2 from '../assets/Logo.webp';
import { useAuth } from '../Context/AuthProvider';

const NavbarAdmin = () => {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleMenu = (): void => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      const menuIcon = document.getElementById('menu-icon');
      if (menuIcon && menuIcon.contains(event.target as Node)) {
        return;
      }
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    logOut();
    navigate('/');
  };

  if (!user || user.role !== 'ADMIN') {
    // Pode redirecionar pra home ou login se não for admin
    navigate('/');
    return null;
  }

  return (
    <>
      <Nav className={isScrolled ? 'scrolled' : ''}>
        <a href="/">
          <Logo src={Logo2} alt="Logo" />
        </a>

        <NavList>
          <NavItem>
            <AdminDropdown>
              <NavLink as="button">Administração ▾</NavLink>
              <DropdownContent>
                <NavLink href="/">Veículos</NavLink>
                <NavLink href="/vendedores">Vendedores</NavLink>
                <NavLink href="/marcas">Marcas</NavLink>
                <NavLink href="/cadastrarAdmin">Cadastrar administrador</NavLink>
              </DropdownContent>
            </AdminDropdown>
          </NavItem>
          <NavItem>
            <ButtonLink onClick={handleLogoutClick}>Sair</ButtonLink>
          </NavItem>
        </NavList>

        <MenuIcon id="menu-icon" onClick={toggleMenu}>
          {open ? 'X' : '☰'}
        </MenuIcon>
      </Nav>

      <ContentNavDiv>
        {open && (
          <DropdownMenu ref={dropdownRef}>
            <DropdownMenuList>
              <NavItem>
                <AdminDropdown>
                  <NavLink as="button">Administração ▾</NavLink>
                  <DropdownContent>
                    <NavLink href="/veiculos">Veículos</NavLink>
                    <NavLink href="/vendedores">Vendedores</NavLink>
                    <NavLink href="/marcas">Marcas</NavLink>
                    <NavLink href="/cadastrarAdmin">Cadastrar administrador</NavLink>
                  </DropdownContent>
                </AdminDropdown>
              </NavItem>
              <NavItem>
                <ButtonLink onClick={handleLogoutClick}>Sair</ButtonLink>
              </NavItem>
            </DropdownMenuList>
          </DropdownMenu>
        )}
      </ContentNavDiv>
    </>
  );
};

export default NavbarAdmin;
