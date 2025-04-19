import React from 'react'
import { useTranslation } from 'react-i18next' // <-- Import do hook
import styled from 'styled-components'
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap'
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaInstagram
} from 'react-icons/fa'

// Imagens importadas
import FooterImage01 from '../../../assets/img/1.png'
import FooterImage02 from '../../../assets/img/2.png'
import FooterImage03 from '../../../assets/img/4.png'
import FooterImage04 from '../../../assets/img/15.png'
import FooterImage05 from '../../../assets/img/19.png'
import FooterImage06 from '../../../assets/img/33.png'

const FooterSection = styled.footer`
  background-color: #0c1c59;
  color: #ffffff;
  padding: 100px 0;
  font-family: Arial, sans-serif;
`

const FooterTop = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 30px;
  margin-bottom: 30px;
`

const FooterTitle = styled.h5`
  font-weight: 700;
  margin-bottom: 0rem;
  font-size: 1.2rem;
  text-transform: uppercase;
`

const FooterSubtitle = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
  color: #ccc;
`

const IconCircle = styled.a`
  border: 1px solid #fff;
  border-radius: 50%;
  padding: 8px;
  color: #fff;
  font-size: 1rem;
  line-height: 1;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #fff;
    color: #0c1c59;
    text-decoration: none;
  }
`

const NewsletterBox = styled.div`
  background-color: #ffc107;
  color: #0c1c59;
  padding: 20px;
  border-radius: 4px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const NewsletterInput = styled(Form.Control)`
  border-radius: 4px 0 0 4px;
  border: none;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`

const NewsletterButton = styled(Button)`
  border-radius: 0 4px 4px 0;
  background-color: #0c1c59;
  color: #ffc107;
  font-weight: 700;
  border: 1px solid #0c1c59;

  &:hover {
    background-color: #fff;
    color: #0c1c59;
    border: 1px solid #0c1c59;
  }
`

const SectionTitle = styled.h5`
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  position: relative;
  text-transform: uppercase;
`

const YellowBar = styled.span`
  display: block;
  width: 40px;
  height: 4px;
  background-color: #ffc107;
  margin-top: 4px;
`

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 0.9rem;
`

const FooterListItem = styled.li`
  margin-bottom: 0.4rem;
  list-style: none;
  a {
    color: rgb(204, 204, 204);
    list-style: none;
    transition: color 0.2s ease;
    &:hover {
      color: #ffc107;
    }
  }
`

const InstagramGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`

const PhoneWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffc107;
  font-weight: 700;
  font-size: 1rem;
`

const SImage = styled(Image)`
  width: 100%;
  height: 100px;
  max-width: 180px;
  display: block;
  margin: 0 auto;
  background-size: cover;
`

const FooterSubtitleParagraph = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #ccc;
`

export const FooterListItemInstagram = styled.li`
  list-style: none;
  a {
    color: #ffffff;
    transition: color 0.2s ease;
    &:hover {
      color: #ffc107;
    }
  }
`

const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <FooterSection>
      <Container>
        {/* Seção Superior */}
        <FooterTop>
          <Row>
            {/* Coluna 1: Suporte 24/7 */}
            <Col md={4} className="mb-4 mb-md-0">
              {/* "Assistência ao Cliente 24/7" -> t('footer.topTitle') */}
              <FooterTitle>{t('footer.top.title')}</FooterTitle>
              <YellowBar className="mb-3" />

              {/* Subtexto -> t('footer.top.subtitle') */}
              <FooterSubtitle>
                {t('footer.top.subtitle')} <strong>24/7</strong>
              </FooterSubtitle>
              <PhoneWrapper>
                <FaPhoneAlt size={18} />
                <span>{t('footer.top.phoneNumber')}</span>
              </PhoneWrapper>
            </Col>

            {/* Coluna 2: Redes Sociais */}
            <Col md={4} className="d-flex flex-column align-items-start">
              <FooterTitle>{t('footer.top.followUsTitle')}</FooterTitle>
              <YellowBar className="mb-3" />
              <FooterSubtitleParagraph>
                {t('footer.top.followUsText')}
              </FooterSubtitleParagraph>

              <div className="d-flex gap-3 mt-2">
                <IconCircle href="#instagram">
                  <FaInstagram />
                </IconCircle>
                <IconCircle href="#twitter">
                  <FaTwitter />
                </IconCircle>
                <IconCircle href="#linkedin">
                  <FaLinkedinIn />
                </IconCircle>
              </div>
            </Col>

            <Col md={4}>
              <NewsletterBox>
                {/* "Subscreva a Newsletter" -> t('footer.newsletter.title') */}
                <h6 className="fw-bold mb-1 text-uppercase">
                  {t('footer.newsletter.title')}
                </h6>
                <p className="mb-2" style={{ fontSize: '0.9rem' }}>
                  {t('footer.newsletter.subtitle')}
                </p>
                <Form className="d-flex">
                  <NewsletterInput
                    type="email"
                    placeholder={t('footer.newsletter.placeholder') || ''}
                  />
                  <NewsletterButton type="submit">
                    {t('footer.newsletter.button')}
                  </NewsletterButton>
                </Form>
              </NewsletterBox>
            </Col>
          </Row>
        </FooterTop>

        <Row>
          {/* Contato */}
          <Col md={4} className="mb-5 mb-md-0">
            <SectionTitle>
              {t('footer.bottom.contactTitle')}
              <YellowBar />
            </SectionTitle>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#ccc' }}>
              {t('footer.bottom.contactAddressLine1')}
              <br />
              {t('footer.bottom.contactAddressLine2')}
            </p>
            <p style={{ fontSize: '0.9rem' }}>
              E-mail:{' '}
              <a
                href="mailto:info@noropa.com"
                style={{ color: '#FFC107', textDecoration: 'none' }}
              >
                {t('footer.bottom.contactEmail')}
              </a>
            </p>
            <div className="d-flex gap-3 mt-2">
              <IconCircle
                href="https://www.instagram.com/noropaviagenseturismo/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </IconCircle>
              <IconCircle href="#twitter">
                <FaTwitter />
              </IconCircle>
              <IconCircle href="#linkedin">
                <FaLinkedinIn />
              </IconCircle>
            </div>
          </Col>

          {/* Links Rápidos */}
          <Col md={4} className="mb-5 mb-md-0">
            <SectionTitle>
              {t('footer.bottom.quickLinks')}
              <YellowBar />
            </SectionTitle>
            <Row>
              <Col xs={6}>
                <FooterList>
                  <FooterListItem>
                    <a href="#tour-search">
                      {t('footer.bottom.linkTourSearch')}
                    </a>
                  </FooterListItem>
                  <FooterListItem>
                    <a href="#clients-say">
                      {t('footer.bottom.linkClientsSay')}
                    </a>
                  </FooterListItem>
                  <FooterListItem>
                    <a href="#services">
                      {t('footer.bottom.linkServices')}
                    </a>
                  </FooterListItem>
                  <FooterListItem>
                    <a href="https://www.instagram.com/noropaviagenseturismo/">
                      {t('footer.bottom.linkAboutUs')}
                    </a>
                  </FooterListItem>
                  <FooterListItem>
                    <a href="#orchid-grid">
                      {t('footer.bottom.linkGridView')}
                    </a>
                  </FooterListItem>
                </FooterList>
              </Col>
              <Col xs={6}>
                <FooterList>
                  <FooterListItem>
                    <a href="#contact">{t('footer.bottom.linkContact')}</a>
                  </FooterListItem>
                  <FooterListItem>
                    <a href="#team">{t('footer.bottom.linkTeam')}</a>
                  </FooterListItem>
                  <FooterListItem>
                    <a href="#why-choose">
                      {t('footer.bottom.linkWhyChooseUs')}
                    </a>
                  </FooterListItem>
                  <FooterListItem>
                    <a href="#home-tourism">
                      {t('footer.bottom.linkTourism')}
                    </a>
                  </FooterListItem>
                </FooterList>
              </Col>
            </Row>
          </Col>

          {/* Instagram Fotos */}
          <Col md={4}>
            <SectionTitle>
              <FooterListItemInstagram>
                <a href="https://www.instagram.com/noropaviagenseturismo/">
                  {t('footer.bottom.instagramTitle')}
                </a>
              </FooterListItemInstagram>
              <YellowBar />
            </SectionTitle>
            <InstagramGrid>
              <SImage src={FooterImage01} />
              <SImage src={FooterImage02} />
              <SImage src={FooterImage03} />
              <SImage src={FooterImage04} />
              <SImage src={FooterImage05} />
              <SImage src={FooterImage06} />
            </InstagramGrid>
          </Col>
        </Row>
      </Container>
    </FooterSection>
  )
}

export default Footer
