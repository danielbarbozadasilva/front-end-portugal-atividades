import { Button, Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledNavbar = styled(Navbar)`
  background-color: #ffffff !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

export const StyleProfile = styled(Navbar)`
  display: flex;
  justify-content: space-between;
  margin-left: 20rem;
  @media (max-width: 990px) {
    margin-left: 0;
    display: block;
    text-align: center; 
  } 
`;

export const NavLink = styled(Nav.Link)`
  color: var(--vibrant-dark) !important;
  font-weight: 600;
  transition: color 0.2s ease-in-out;
  margin-left: 2rem;

  &:hover {
    color: black!important;
    text-decoration: underline!important;
  }

  &.active {
    color: var(--vibrant-primary)!important;
    text-decoration: underline!important;
  }
`;

export const OutlineButton = styled(Button)`
  color: var(--vibrant-primary);
  border-color: var(--vibrant-primary);
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: var(--vibrant-primary);
    color: var(--vibrant-accent);
    text-decoration: underline;
    border-bottom: 1px solid var(--vibrant-accent);
  }
`;
