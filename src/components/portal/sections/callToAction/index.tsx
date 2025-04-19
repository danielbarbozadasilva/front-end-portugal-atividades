import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { CTAContainer, Lead, Overlay, SectionWrapper, Title } from './styled';


const CallToActionSection: React.FC = () => {
  return (
    <SectionWrapper id="sobre">
      <Overlay />
      <CTAContainer>
        <Row>
          <Col xl={9} className="mx-auto position-relative">
            <Title>Portugal Espera Por Si!</Title>
            <Lead>
              Comece já a planear a sua viagem e descubra todos os encantos que Portugal tem para oferecer.
            </Lead>
          </Col>
          <Col md={10} lg={8} xl={7} className="mx-auto position-relative">
            <Button variant="light" size="lg" className="btn-cta-vibrant" href="#planejar">
              Planear Aventura
            </Button>
          </Col>
        </Row>
      </CTAContainer>
    </SectionWrapper>
  );
};

export default CallToActionSection;
