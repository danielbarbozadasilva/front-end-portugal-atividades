import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { fieldValidate, isNotValid } from './validate';
import { SButtonFormRecovery, SFormRecovery, STextForm } from './styled';
import Loading from '../../../loading/form';
import { useAppSelector } from '../../../../hooks';

const FormRecoveryPassword: React.FC<any> = ({ submit }) => {

  const loading: boolean = useAppSelector((state) => state.auth.loading);

  const [formValidate, setFormValidate] = useState({ email: '' });
  const [form, setForm] = useState({ email: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const message = fieldValidate(name, value);
    setFormValidate((prev) => ({ ...prev, [name]: message }));

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const submitForm = () => {
    submit(form);
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <SFormRecovery>
            <STextForm>Recuperar Senha</STextForm>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>E-mail:</Form.Label>
              <Form.Control
                disabled={loading}
                type="email"
                name="email"
                onChange={handleChange}
                value={form.email || ''}
                placeholder="Informe o seu e-mail"
              />
              <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                {formValidate.email || ''}
              </Form.Control.Feedback>
            </Form.Group>

            {loading ? (
              <Loading />
            ) : (
              <SButtonFormRecovery
                type="button"
                onClick={submitForm}
                disabled={isNotValid(form, formValidate)}
              >
                Redefinir senha
              </SButtonFormRecovery>
            )}
          </SFormRecovery>
        </Col>
      </Row>
    </Container>
  );
};

export default FormRecoveryPassword;
