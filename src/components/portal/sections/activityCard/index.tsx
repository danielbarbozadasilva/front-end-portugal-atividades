import React from 'react';
import { Container, Row, Col, CardImg } from 'react-bootstrap';
import { ActivityCardProps, IActivity } from './types';
import {
  CardBody,
  CardButton,
  CardText,
  CardTitle,
  SectionTitle,
  SectionWrapper,
  StyledCard
} from './styled';

const ActivitiesCardComponent: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <SectionWrapper id="atividades">
      <Container>
        <SectionTitle>Atividades Imperdíveis</SectionTitle>
        <Row>
          {activity?.length > 0 ? activity.map((item: IActivity) => {
            const { _id, images, name, description, startDate, endDate, likes } = item;
            return (
              <Col key={_id} md={6} lg={4} className="mb-4">
                <StyledCard className="shadow h-100">
                  <CardImg
                    variant="top"
                    src={images && images?.length > 0 ? images[0] : ''}
                    alt={name}
                  />
                  <CardBody className="d-flex flex-column">
                    <CardTitle>{name}</CardTitle>
                    <CardText>{description}</CardText>
                    <p>
                      <strong>Início:</strong> {new Date(startDate).toLocaleString()} <br />
                      <strong>Fim:</strong> {new Date(endDate).toLocaleString()}
                    </p>
                    <p>
                      <strong>Curtidas:</strong> {likes ? likes.length : 0}
                    </p>
                    <CardButton href="#">{name}</CardButton>
                  </CardBody>
                </StyledCard>
              </Col>
            );
          }): <></>}
        </Row>
      </Container>
    </SectionWrapper>
  );
};

export default ActivitiesCardComponent;
