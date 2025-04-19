import React, { useState, useEffect, ChangeEvent } from 'react';
import { useAppSelector } from '../../../../../hooks';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Loading from '../../../../loading/form/index';
import { ISignUpAgent, SignUpAgentProps, TFormErrors } from './types';
import { fieldValidate, formatDocByCountry, formatPhoneByCountry, isNotValid } from './validations';
import { SButton, SFormGroup, SFormSignUp, SRow, STextForm } from './styled';

const SignUpAgentComponent: React.FC<SignUpAgentProps> = ({ submit }) => {
  const { t } = useTranslation();
  const loading: boolean = useAppSelector((state) => state.auth.loading);

  const [agent, setAgent] = useState<ISignUpAgent>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    permissions: ['agent'],
    agentType: 'Pessoa Física',
    companyName: '',
    tradeName: '',
    cpf: '',
    cnpj: '',
    birthDate: undefined,
    mobilePhone: '',
    whatsapp: '',
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    country: 'Portugal',
    bank: '',
    bankAgency: '',
    bankAccount: '',
    accountType: 'Conta Corrente'
  });

  const [formErrors, setFormErrors] = useState<TFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const newErrors: TFormErrors = {};

    Object.keys(agent).forEach((key) => {
      const k = key as keyof ISignUpAgent;
      const v = agent[k] || '';
      let valueAsString = '';

      if (typeof v === 'string') {
        valueAsString = v;
      } else if (v instanceof Date) {
        valueAsString = v.toISOString();
      }

      const errorMessage = fieldValidate(k, valueAsString, agent, t);
      if (errorMessage) {
        newErrors[k] = errorMessage;
      }
    });

    setFormErrors(newErrors);
  }, [agent, t]);

  function handleChange(e: ChangeEvent<any>) {
    const { name, value } = e.target;
    setAgent((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleBlur(e: React.FocusEvent<any>) {
    const { name, value } = e.target;

    if (name === 'cpf' || name === 'cnpj') {
      setAgent((prev) => ({
        ...prev,
        [name]: formatDocByCountry(value, prev.country, prev.agentType)
      }));
    }

    if (name === 'mobilePhone' || name === 'whatsapp') {
      setAgent((prev) => ({
        ...prev,
        [name]: formatPhoneByCountry(value, prev.country)
      }));
    }
  }

  function handleSubmitForm() {
    if (isNotValid(agent, formErrors)) {
      return;
    }
    submit(agent);
  }

  return (
    <SFormSignUp autoComplete="off">
      <STextForm>{t('signup')}</STextForm>
      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('name')}:
          </Form.Label>
          <Form.Control
            type="text"
            placeholder={t('placeholder.name') || ''}
            disabled={loading}
            name="name"
            value={agent.name}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!formErrors.name}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.name || ''}
          </Form.Control.Feedback>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>
            {t('email')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder={t('placeholder.email') || ''}
            disabled={loading}
            name="email"
            value={agent.email}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!formErrors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.email}
          </Form.Control.Feedback>
        </SFormGroup>
      </SRow>

      <Row>
        <Col>
          <Form.Label>
            {t('password')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder={t('placeholder.password') || ''}
              disabled={loading}
              name="password"
              value={agent.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!formErrors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.password}
            </Form.Control.Feedback>
            <InputGroup.Text
              style={{ cursor: 'pointer' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? t('hide') : t('show')}
            </InputGroup.Text>
          </InputGroup>
        </Col>

        <Col>
          <Form.Label>
            {t('confirmPassword')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={t('placeholder.confirmPassword') || ''}
              disabled={loading}
              name="confirmPassword"
              value={agent.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!formErrors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.confirmPassword}
            </Form.Control.Feedback>
            <InputGroup.Text
              style={{ cursor: 'pointer' }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? t('hide') : t('show')}
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Label>
            {t('agentType')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Select
            disabled={loading}
            name="agentType"
            value={agent.agentType}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!formErrors.agentType}
          >
            <option value="Pessoa Física">{t('agent.person')}</option>
            <option value="Pessoa Jurídica">{t('agent.company')}</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formErrors.agentType}
          </Form.Control.Feedback>
        </Col>

        <Col>
          <Form.Label>{t('cpf')}</Form.Label>
          <Form.Control
            type="text"
            placeholder="000.000.000-00"
            name="cpf"
            disabled={loading}
            value={agent.cpf || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
        <Col>
          <Form.Label>{t('cnpj')}</Form.Label>
          <Form.Control
            type="text"
            placeholder="00.000.000/0000-00"
            name="cnpj"
            disabled={loading}
            value={agent.cnpj || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Label>{t('companyName')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('placeholder.companyName') || ''}
            disabled={loading}
            name="companyName"
            value={agent.companyName || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
        <Col>
          <Form.Label>{t('tradeName')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('placeholder.tradeName') || ''}
            disabled={loading}
            name="tradeName"
            value={agent.tradeName || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={4}>
          <Form.Label>
            {t('country')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Select
            name="country"
            disabled={loading}
            value={agent.country}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!formErrors.country}
          >
            <option value="Portugal">Portugal</option>
            <option value="Brazil">Brazil</option>
            <option value="England">England</option>
            <option value="US">United States</option>
            <option value="FR">France</option>
            <option value="ES">Spain</option>
            <option value="UK">United Kingdom</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formErrors.country}
          </Form.Control.Feedback>
        </Col>

        <Col xs={12} md={4}>
          <Form.Label>
            {t('mobilePhone')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="tel"
            placeholder={t('placeholder.mainPhone') || ''}
            name="mobilePhone"
            disabled={loading}
            value={agent.mobilePhone}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!formErrors.mobilePhone}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.mobilePhone}
          </Form.Control.Feedback>
        </Col>

        <Col xs={12} md={4}>
          <Form.Label>{t('whatsapp')}</Form.Label>
          <Form.Control
            type="tel"
            placeholder={t('placeholder.optionalPhone') || ''}
            name="whatsapp"
            disabled={loading}
            value={agent.whatsapp || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={4}>
          <Form.Label>
            {t('zipCode')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="zipCode"
            disabled={loading}
            value={agent.zipCode}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!formErrors.zipCode}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.zipCode}
          </Form.Control.Feedback>
        </Col>

        <Col xs={12} md={8}>
          <Form.Label>
            {t('street')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="street"
            disabled={loading}
            value={agent.street}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!formErrors.street}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.street}
          </Form.Control.Feedback>
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={4}>
          <Form.Label>
            {t('number')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="number"
            disabled={loading}
            value={agent.number}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!formErrors.number}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.number}
          </Form.Control.Feedback>
        </Col>

        <Col xs={12} md={8}>
          <Form.Label>{t('complement')}</Form.Label>
          <Form.Control
            type="text"
            name="complement"
            disabled={loading}
            value={agent.complement || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Label>
            {t('neighborhood')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="neighborhood"
            disabled={loading}
            value={agent.neighborhood}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!formErrors.neighborhood}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.neighborhood}
          </Form.Control.Feedback>
        </Col>

        <Col>
          <Form.Label>
            {t('city')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="city"
            disabled={loading}
            value={agent.city}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!formErrors.city}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.city}
          </Form.Control.Feedback>
        </Col>

        <Col>
          <Form.Label>
            {t('state')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="state"
            disabled={loading}
            value={agent.state}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!formErrors.state}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.state}
          </Form.Control.Feedback>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Label>{t('bank')}</Form.Label>
          <Form.Control
            type="text"
            name="bank"
            disabled={loading}
            value={agent.bank || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>

        <Col>
          <Form.Label>{t('bankAgency')}</Form.Label>
          <Form.Control
            type="text"
            name="bankAgency"
            disabled={loading}
            value={agent.bankAgency || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>

        <Col>
          <Form.Label>{t('bankAccount')}</Form.Label>
          <Form.Control
            type="text"
            name="bankAccount"
            disabled={loading}
            value={agent.bankAccount || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Label>{t('accountType')}</Form.Label>
          <Form.Select
            name="accountType"
            disabled={loading}
            value={agent.accountType}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="Conta Corrente">{t('accountTypeChecking')}</option>
            <option value="Poupança">{t('accountTypeSaving')}</option>
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <Loading />
      ) : (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <SButton
            onClick={handleSubmitForm}
            disabled={isNotValid(agent, formErrors)}
          >
            {t('submit')}
          </SButton>
        </div>
      )}
    </SFormSignUp>
  );
};

export default SignUpAgentComponent;
