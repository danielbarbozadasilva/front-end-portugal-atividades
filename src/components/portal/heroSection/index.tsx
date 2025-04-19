import React from 'react'
import { useTranslation } from 'react-i18next' // <-- Import
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import styled, { keyframes } from 'styled-components'
import { FaSearch } from 'react-icons/fa'

const HeroWrapper = styled.section`
  font-family: Arial, sans-serif;
  text-align: center;
  color: #fff;
  margin-top: 5rem;
  padding: 9rem 0;
  position: relative;
  background: url('/assets/img/hero-background-lisboa-sunset.jpg') no-repeat center center;
  background-size: cover;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0c1c59;
  opacity: 0.7;
`

const Content = styled(Container)`
  position: relative;
  z-index: 2;
`

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  text-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  animation: ${fadeInUp} 0.6s ease-out;
`

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 2.5rem;
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
  animation: ${fadeInUp} 0.8s ease-out;
`

const SearchInput = styled(Form.Control)`
  height: calc(3rem + 2px);
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  box-shadow: none;

  &:focus {
    border-color: #ffc107;
    outline: none;
    box-shadow: 0 0 0 0.15rem rgba(255, 193, 7, 0.4);
  }
`

const SearchButton = styled(Button)`
  height: calc(3rem + 2px);
  border-radius: 0.5rem;
  font-weight: 700;
  border: none;
  background-color: #ffc107;
  color: #0c1c59;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 20%;
  text-align: center;
  margin-top: 3rem;
  &:hover {
    background-color: #fff;
    color: #0c1c59;
  }
`

const HeroSection: React.FC = () => {
  const { t } = useTranslation()

  return (
    <HeroWrapper id="hero">
      <Overlay />
      <Content>
        <Row className="justify-content-center">
          <Col xl={9} className="mx-auto position-relative">
            {/* Antes: "Explore a Essência de Portugal" --> Agora: t('home.hero.title') */}
            <HeroTitle>
              {t('home.hero.title')}
            </HeroTitle>
            {/* Antes: "Viva experiências inesquecíveis..." --> Agora: t('home.hero.subtitle') */}
            <HeroSubtitle>
              {t('home.hero.subtitle')}
            </HeroSubtitle>
          </Col>
          <Col
            md={10}
            lg={8}
            xl={7}
            className="mx-auto position-relative"
          >
            <Form>
              <Row className="justify-content-center">
                <Col xs={12} md={9}>
                  {/* Antes: "Descubra atividades, destinos..." --> Agora: t('home.hero.searchPlaceholder') */}
                  <SearchInput
                    type="search"
                    placeholder={t('home.hero.searchPlaceholder') || ''}
                  />
                </Col>
                <Row className="justify-content-center">
                  {/* Antes: "Explorar" --> Agora: t('home.hero.searchButton') */}
                  <SearchButton type="submit">
                    <FaSearch style={{ marginRight: '6px' }} />
                    {t('home.hero.searchButton')}
                  </SearchButton>
                </Row>
              </Row>
            </Form>
          </Col>
        </Row>
      </Content>
    </HeroWrapper>
  )
}

export default HeroSection
