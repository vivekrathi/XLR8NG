import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Container, FlexContainer } from '../../styles/components';
import { colors } from '../../styles/theme';

const HeaderContainer = styled.header`
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Nav = styled.nav`
  padding: 16px 0;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  color: ${colors.primary};
  text-decoration: none;
  
  &:hover {
    color: ${colors.primary};
  }
`;

const NavLinks = styled(FlexContainer)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ active?: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  color: ${props => props.active ? colors.primary : colors.gray[700]};
  background: ${props => props.active ? colors.gray[100] : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${colors.gray[100]};
    color: ${colors.primary};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  font-size: 20px;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <HeaderContainer>
      <Container>
        <Nav>
          <FlexContainer justify="space-between" align="center">
            <Logo to="/">
              🛍️ TheDealApp
            </Logo>
            
            <NavLinks gap="8px">
              <NavLink to="/" active={isActive('/')}>
                Home
              </NavLink>
              <NavLink to="/super-deals" active={isActive('/super-deals')}>
                Super Deals
              </NavLink>
              <NavLink to="/latest" active={isActive('/latest')}>
                Latest
              </NavLink>
              <NavLink to="/price-drops" active={isActive('/price-drops')}>
                Price Drops
              </NavLink>
              <NavLink to="/events" active={isActive('/events')}>
                Events
              </NavLink>
            </NavLinks>
            
            <MobileMenuButton>
              ☰
            </MobileMenuButton>
          </FlexContainer>
        </Nav>
      </Container>
    </HeaderContainer>
  );
};

export default Header;