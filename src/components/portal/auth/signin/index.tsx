import React, { ChangeEvent } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { PageType } from '../../../types';
import Loading from '../../../loading/form';
import { useAppSelector } from '../../../../hooks';
import { SButtonSignIn, SColFooter, SFormSignIn, STextForm, STextLink } from './styled';
import { useTranslation } from 'react-i18next';

const SignInClientComponent: React.FC<PageType> = ({ submit }) => {
  const { t } = useTranslation();
  const loading: boolean = useAppSelector((state) => state.auth.loading);
  const registered: boolean = useAppSelector((state) => state.auth.registered);
  const [form, setForm] = React.useState({ email: '', password: '' });

  React.useEffect(() => {
    if (registered) {
      setForm({ email: '', password: '' });
    }
  }, [registered]);

  const handleChange = (props: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = props.target;
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
          <SFormSignIn>
            <STextForm>{t('loginTitle')}</STextForm>
            <Form.Group className="mb-3">
              <Form.Label>{t('email')}:</Form.Label>
              <Form.Control
                disabled={loading}
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={form.email || ''}
                placeholder={t('placeholder.emailLogin') || ''}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('password')}:</Form.Label>
              <Form.Control
                disabled={loading}
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={form.password || ''}
                placeholder={t('placeholder.passwordLogin') || ''}
              />
            </Form.Group>

            {loading ? (
              <Loading />
            ) : (
              <SButtonSignIn type="button" onClick={submitForm}>
                {t('signInButton')}
              </SButtonSignIn>
            )}

            <SColFooter>
              {t('forgotPassword')}?{' '}
              <STextLink href="/recovery-password">{t('resetPassword')}</STextLink>
            </SColFooter>
          </SFormSignIn>
        </Col>
      </Row>
    </Container>
  );
};
export default SignInClientComponent;