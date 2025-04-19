import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import aboutImage from '../../assets/img/about-image.jpg'; // Replace with your actual image
import teamMember1 from '../../assets/img/team-member1.jpg'; // Example team member image
import teamMember2 from '../../assets/img/team-member2.jpg'; // Example team member image
import styled from 'styled-components';

interface Props {}

export const AboutSection = styled.section`
  padding: 60px 0;
  background-color: #f8f9fa; /* Light gray background */
`;

export const AboutTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #343a40; /* Dark gray title */
  margin-bottom: 1rem;
  text-align: center; /* Center the title */
`;

export const AboutText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #6c757d; /* Medium gray text */
`;

export const ImageContainer = styled.div`
  /* Add hover effect */
    overflow: hidden; /* Ensure image stays within rounded borders */
  border-radius: 10px; /* Rounded corners for the image container */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05); /* Slightly enlarge image on hover */
    }

    img {
      width: 100%;
      height: auto;
      display: block; /* Remove any extra space below the image */
      border-radius: 10px;
    }
`;

export const TeamSection = styled.section`
  padding: 60px 0;
  background-color: #fff; /* White background for team section */
`;

export const TeamMember = styled.div`
  text-align: center;
  margin-bottom: 30px;

`;

export const TeamMemberName = styled.h4`
  font-size: 1.2rem;
  font-weight: bold;
  color: #343a40;
  margin-top: 15px;
`;

export const TeamMemberRole = styled.p`
  font-size: 1rem;
  color: #6c757d;
`;

const About: React.FC<Props> = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <AboutSection>
        <Row>
          <Col md={6}>
            <AboutTitle>{t('about.title')}</AboutTitle>
            <AboutText>
              {t('about.description1')}
              <br /><br />
              {t('about.description2')}
            </AboutText>
          </Col>
          <Col md={6}>
            <ImageContainer>
              <Image src={aboutImage} alt={t('about.imageAlt')} fluid rounded />
            </ImageContainer>
          </Col>
        </Row>
      </AboutSection>

      <TeamSection>
        <AboutTitle>{t('about.teamTitle')}</AboutTitle>
        <Row>
          <Col sm={6} md={4} lg={3}>
            <TeamMember>
              <Image src={teamMember1} alt={t('about.teamMember1Alt')} fluid roundedCircle />
              <TeamMemberName>{t('about.teamMember1Name')}</TeamMemberName>
              <TeamMemberRole>{t('about.teamMember1Role')}</TeamMemberRole>
            </TeamMember>
          </Col>
          <Col sm={6} md={4} lg={3}>
            <TeamMember>
              <Image src={teamMember2} alt={t('about.teamMember2Alt')} fluid roundedCircle />
              <TeamMemberName>{t('about.teamMember2Name')}</TeamMemberName>
              <TeamMemberRole>{t('about.teamMember2Role')}</TeamMemberRole>
            </TeamMember>
          </Col>
        </Row>
      </TeamSection>
    </Container>
  );
};

export default About;