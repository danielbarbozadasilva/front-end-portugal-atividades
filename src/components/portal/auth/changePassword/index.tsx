import React, { useState, ChangeEvent } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Loading from '../../../loading/form/index';
import { IFormChangePasswordProps, IFormData, TFormErrors } from './types';
import { fieldValidate, isNotValid } from './validate';
import { SButtonFormRecovery, STextForm, SFormRecovery } from './styled';
import { useAppSelector } from '../../../../hooks';

const FormChangePasswordComponnent: React.FC<IFormChangePasswordProps> = ({ submit }) => {
  const loading: boolean = useAppSelector((state) => state.auth.loading);
  const [formValidate, setFormValidate] = useState<TFormErrors>({});
  const [form, setForm] = useState<IFormData>({
    token: '',
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const message = fieldValidate(name, value, form);
    setFormValidate((prev) => ({
      ...prev,
      [name]: message
    }));

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const submitForm = () => {
    const newFormData = {
      token: form.token,
      email: form.email,
      newPassword: form.newPassword
    };
    submit(newFormData);
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <SFormRecovery autoComplete="off">
            <STextForm>Recuperar senha</STextForm>
            <Form.Group className="mb-3">
              <Form.Label>Informe o token:</Form.Label>
              <Form.Control
                disabled={loading}
                type="text"
                name="token"
                id="token"
                onChange={handleChange}
                value={form.token}
                placeholder="Informe o token recebido por e-mail"
                isInvalid={!!formValidate.token}
              />
              <Form.Control.Feedback type="invalid">
                {formValidate.token || ''}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>E-mail:</Form.Label>
              <Form.Control
                disabled={loading}
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={form.email}
                placeholder="Informe o seu e-mail"
                isInvalid={!!formValidate.email}
              />
              <Form.Control.Feedback type="invalid">
                {formValidate.email || ''}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nova senha:</Form.Label>
              <Form.Control
                disabled={loading}
                type="password"
                name="newPassword"
                id="newPassword"
                onChange={handleChange}
                value={form.newPassword}
                placeholder="Informe a sua nova senha"
                isInvalid={!!formValidate.newPassword}
              />
              <Form.Control.Feedback type="invalid">
                {formValidate.newPassword || ''}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirmar senha:</Form.Label>
              <Form.Control
                disabled={loading}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={handleChange}
                value={form.confirmPassword}
                placeholder="Confirme a sua nova senha"
                isInvalid={!!formValidate.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {formValidate.confirmPassword || ''}
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

export default FormChangePasswordComponnent;