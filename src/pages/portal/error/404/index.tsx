import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { SForm, STextForm } from '../styled';
import { IErrorProps } from '../types';

const Error404: React.FC<IErrorProps> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <Container fluid className="mt-3">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <SForm>
            <STextForm>{t('errors.404.title')}</STextForm>
            <h5>{t('errors.404.message')}</h5>
          </SForm>
        </Col>
      </Row>
    </Container>
  );
};

export default Error404;
