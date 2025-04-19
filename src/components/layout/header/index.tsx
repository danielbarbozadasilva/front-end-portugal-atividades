import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  Container,
  Row,
  Col,
  Image,
  Dropdown as RBDropdown
} from 'react-bootstrap';
import {
  FaEnvelope,
  FaShareAlt,
  FaFacebookF,
  FaTwitter,
  FaPhoneAlt,
  FaUser,
  FaDoorOpen,
  FaInstagram,
  FaCaretDown,
  FaUserCircle,
  FaEdit,
  FaClipboardList,
  FaSignOutAlt
} from 'react-icons/fa';

import LogoImage from '../../../assets/img/logo.jpg';
import LanguageSelector from '../../languageSelector/index';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { AuthAction } from '../../../store/auth/auth.action';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const HeaderContainer = styled.header`
  width: 100%;
  font-family: Arial, sans-serif;
`;

// Barra superior (amarela)
const TopBar = styled.div`
  background-color: #ffc107;
  color: #000;
  padding: 8px 15px;
  font-size: 0.9rem;
  @media (max-width: 767px) {
    padding: 8px 10px;
  }
`;

// Barra inferior (branca)
const BottomBar = styled.div`
  background-color: rgb(255, 255, 255);
  color: rgb(153, 153, 153);
  padding: 15px;
  @media (max-width: 767px) {
    padding: 15px 10px;
  }
`;

// Grupos de elementos do top bar
const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 4px;
  }
`;

const TopBarCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  @media (max-width: 767px) {
    flex-direction: column;
    width: 100%;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: flex-end;
  @media (max-width: 767px) {
    flex-direction: column;
    width: 100%;
    gap: 8px;
    align-items: center;
  }
`;

// Ícones das redes sociais
const SocialCircle = styled.a`
  width: 32px;
  height: 32px;
  background-color: #ffe066;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.8rem;
  transition: background-color 0.3s, color 0.3s;
  text-decoration: none;

  &:hover {
    background-color: #000;
    color: #ffc107;
  }
`;

// Menu principal (inferior)
const NavMenu = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
  align-items: center;

  @media (max-width: 991px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  @media (max-width: 767px) {
    width: 100%;
    justify-content: center;
  }
`;

const NavItem = styled.li`
  a {
    color: rgb(153, 153, 153);
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.3s;
    &:hover {
      color: #ffc107;
    }
  }
`;

// Helpline + número
const HelplineContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  small {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #999;
  }
  span {
    font-weight: bold;
    color: #ffc107;
    font-size: 1rem;
  }
  @media (max-width: 767px) {
    text-align: center;
    width: 100%;
  }
`;

// Botão Book Tour
const BookTourButton = styled.button`
  margin-left: 2%;
  background-color: #ffc107;
  border: none;
  color: #0c1c59;
  font-weight: 700;
  border-radius: 20px;
  padding: 8px 18px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #fff;
    color: #0c1c59;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;

// Logo
const SImage = styled(Image)`
  height: 130px;
  max-width: 180px;
  display: block;
  margin: 0 auto;
  @media (max-width: 767px) {
    height: auto;
    max-width: 150px;
    margin-bottom: 10px;
  }
`;

const LanguageSelectorWrapper = styled.div`
  margin-right: 20px;
  @media (max-width: 767px) {
    margin-right: 0;
    margin-bottom: 8px;
    width: 100%;
  }
  .form-select {
    width: auto;
    @media (max-width: 767px) {
      width: 100%;
    }
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background-color: #fff;
  margin: 5px 0;
`;

const AuthLink = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #000;
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: #444;
  }
`;
const StyledDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownToggle = styled.button`
  background-color: transparent;
  border: none;
  color: #000;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 5px;

  &:hover {
    background-color: #ffe066;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 193, 7, 0.5);
  }

  & > span:first-child {
    background-color: #0c1c59;
    color: white;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 50%;
    margin-right: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
  }
`;

const DropdownMenuWrapper = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #0c1c59;
  border: 1px solid #0c1c59;
  border-radius: 5px;
  min-width: 200px;
  z-index: 1000;
  padding: 10px 0;
`;

const DropdownHeader = styled.h6`
  color: #fff;
  padding: 8px 15px;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0;
`;

const DropdownItem = styled.a`
  display: flex;
  align-items: center;
  padding: 8px 15px;
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2c3e50;
    color: #fff;
  }
  &.active,
  &:active {
    color: #fff;
    text-decoration: none;
    background-color: #2c3e50;
  }
  svg {
    margin-right: 10px;
    font-size: 1.1rem;
  }
`;

interface DropdownProps {
  userName: string;
  onLogout: () => void;
}

interface DropdownProps {
  userName: string;
  onLogout: () => void;
}

const UserDropdown: React.FC<DropdownProps> = ({ userName, onLogout }) => {
  const { t } = useTranslation();

  return (
    <StyledDropdown>
      <RBDropdown align="end">
        <RBDropdown.Toggle as={DropdownToggle} id="dropdown-custom-components">
          <span>{userName.charAt(0).toUpperCase()}</span>
          <span>{userName}</span> <FaCaretDown />
        </RBDropdown.Toggle>

        <RBDropdown.Menu as={DropdownMenuWrapper}>
          <DropdownHeader>{t('dropdown.header')}</DropdownHeader>
          <RBDropdown.Item as={DropdownItem} href="/profile">
            <FaUserCircle /> {t('dropdown.profile')}
          </RBDropdown.Item>
          <RBDropdown.Item as={DropdownItem} href="/edit-profile">
            <FaEdit /> {t('dropdown.editProfile')}
          </RBDropdown.Item>
          <RBDropdown.Item as={DropdownItem} href="/enrollment">
            <FaClipboardList /> {t('dropdown.enrollment')}
          </RBDropdown.Item>
          <DropdownDivider />
          <RBDropdown.Item
            as="button"
            onClick={onLogout}
            style={{ background: 'transparent', color: '#fff' }}
          >
            <FaSignOutAlt />
            {t('dropdown.logout')}
          </RBDropdown.Item>
        </RBDropdown.Menu>
      </RBDropdown>
    </StyledDropdown>
  );
};

const Header: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const authUserData: any = useAppSelector(
    (state: RootState) => state.auth.user
  );
  const authRegistered: boolean = useAppSelector(
    (state: RootState) => state.auth.registered
  );

  // Handler de logout
  const handleLogout = async () => {
    try {
      const authAction = new AuthAction();
      const userId = authUserData?._id;

      // Dispara sua action de logout
      const result = await dispatch(authAction.logoutAction(userId));
      
      // Se estiver usando createAsyncThunk, o status costuma vir em result.meta.requestStatus
      if (result.meta.requestStatus === 'fulfilled') {
        console.log(result);
        navigate('/');
        toast.success('Logout realizado com sucesso');
      }
    } catch (error) {
      console.error('Não foi possível efetuar logout:', error);
      toast.error('Erro ao fazer logout');
    }
  };

  return (
    <HeaderContainer>
      {/* Barra Superior (amarela) */}
      <TopBar>
        <Container fluid>
          <Row className="align-items-center">
            <Col xs={12} md={4}>
              <TopBarLeft>
                <span style={{ marginRight: '8px' }}>Language:</span>
                <LanguageSelectorWrapper>
                  <LanguageSelector />
                </LanguageSelectorWrapper>
                <div>
                  <FaEnvelope />
                  <span style={{ marginLeft: '4px' }}>
                    info@noropoviagens.com
                  </span>
                </div>
              </TopBarLeft>
            </Col>

            <Col xs={12} md={4} className="d-flex justify-content-center">
              <TopBarCenter>
                <FaShareAlt />
                <span>{t('followUs')}:</span>
                <SocialCircle href="#facebook">
                  <FaFacebookF />
                </SocialCircle>
                <SocialCircle href="#twitter">
                  <FaTwitter />
                </SocialCircle>
                <SocialCircle href="#instagram">
                  <FaInstagram />
                </SocialCircle>
              </TopBarCenter>
            </Col>

            <Col
              xs={12}
              md={4}
              className="d-flex justify-content-end align-items-center"
            >
              {authRegistered ? (
                <UserDropdown
                  userName={authUserData?.name || 'Account'}
                  onLogout={handleLogout}
                />
              ) : (
                <TopBarRight>
                  <AuthLink href="/signin">
                    <FaUser />
                    <span>{t('signIn')}</span>
                  </AuthLink>
                  <AuthLink href="/signup-client">
                    <FaDoorOpen />
                    <span>{t('registerClient')}</span>
                  </AuthLink>
                  <AuthLink href="/signup-agent">
                    <FaDoorOpen />
                    <span>{t('registerAgent')}</span>
                  </AuthLink>
                </TopBarRight>
              )}
            </Col>
          </Row>
        </Container>
      </TopBar>

      {/* Barra Inferior (branca) */}
      <BottomBar>
        <Container fluid>
          <Row className="align-items-center">
            <Col xs={12} md={3} className="text-center">
              <SImage src={LogoImage} alt={t('siteLogoAlt') || 'Site Logo'} />
            </Col>

            <Col xs={12} md={5} className="mt-3 mt-md-0">
              <NavMenu>
                <NavItem>
                  <a href="#home">{t('homePage')}</a>
                </NavItem>
                <NavItem>
                  <a href="#about">{t('about')}</a>
                </NavItem>
                <NavItem>
                  <a href="#tours">{t('tours')} ▼</a>
                </NavItem>
                <NavItem>
                  <a href="#pricing">{t('prices')}</a>
                </NavItem>
                <NavItem>
                  <a href="#destinations">{t('destinations')}</a>
                </NavItem>
                <NavItem>
                  <a href="#contact">{t('contact')}</a>
                </NavItem>
              </NavMenu>
            </Col>
            
            <Col
              xs={12}
              md={4}
              className="d-flex align-items-center justify-content-center mt-3 mt-md-0"
            >
              <HelplineContainer>
                <small>{t('helpline')}:</small>
                <span>
                  <FaPhoneAlt style={{ marginRight: '5px' }} /> +111-888-000
                </span>
              </HelplineContainer>
              <BookTourButton>{t('bookTour')}</BookTourButton>
            </Col>
          </Row>
        </Container>
      </BottomBar>
    </HeaderContainer>
  );
};

export default Header;
