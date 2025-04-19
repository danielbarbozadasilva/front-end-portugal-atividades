import React, { useState, useEffect, ChangeEvent, FocusEvent } from 'react';
import { Col, Form } from 'react-bootstrap';
import Loading from '../../../../loading/form/index';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../../hooks';
import { IProfileAgent, ProfileAgentProps, TFormErrors } from './types';
import { fieldValidate, formatDocByCountry, formatPhoneByCountry, isNotValid } from './validate';
import { SButton, SFormGroup, SFormSignUp, SRow, STextForm } from './styled';

const ProfileAgent: React.FC<ProfileAgentProps> = ({ submit }) => {
  const { t } = useTranslation();
  const loading: boolean = useAppSelector((state) => state.auth.loading);

  const [agent, setAgent] = useState<IProfileAgent>({
    name: '',
    email: '',
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

  useEffect(() => {
    const newErrors: TFormErrors = {};

    Object.keys(agent).forEach((key) => {
      const k = key as keyof IProfileAgent;
      const value = agent[k] || '';

      const valueAsString =
        typeof value === 'string'
          ? value
          : value instanceof Date
          ? value.toISOString()
          : '';

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

  async function handleBlur(e: FocusEvent<any>) {
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
      <STextForm>{t('profileAgent')}</STextForm>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('name')}:
          </Form.Label>
          <Form.Control
            type="text"
            placeholder={t('placeholder.name') as string}
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
            <span style={{ color: 'red' }}>*</span> {t('email')}
          </Form.Label>
          <Form.Control
            type="email"
            placeholder={t('placeholder.email') as string}
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

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('agentType')}
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
        </SFormGroup>

        <SFormGroup as={Col}>
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
        </SFormGroup>

        <SFormGroup as={Col}>
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
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>{t('companyName')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('placeholder.companyName') as string}
            disabled={loading}
            name="companyName"
            value={agent.companyName || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>{t('tradeName')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('placeholder.tradeName') as string}
            disabled={loading}
            name="tradeName"
            value={agent.tradeName || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('country')}
          </Form.Label>
          <Form.Select
            name="country"
            disabled={loading}
            value={agent.country}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="Portugal">Portugal</option>
            <option value="Brazil">Brazil</option>
            <option value="England">England</option>
            <option value="United States">United States</option>
            <option value="France">France</option>
            <option value="Spain">Spain</option>
            <option value="United Kingdom">United Kingdom</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formErrors.country}
          </Form.Control.Feedback>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('phone')}
          </Form.Label>
          <Form.Control
            type="tel"
            placeholder={t('placeholder.mainPhone') as string}
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
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>{t('whatsapp')}</Form.Label>
          <Form.Control
            type="tel"
            placeholder={t('placeholder.optionalPhone') as string}
            name="whatsapp"
            disabled={loading}
            value={agent.whatsapp || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('zipCode')}
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
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('street')}
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
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('number')}
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
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>{t('complement')}</Form.Label>
          <Form.Control
            type="text"
            name="complement"
            disabled={loading}
            value={agent.complement || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('neighborhood')}
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
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('city')}
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
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('state')}
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
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>{t('bank')}</Form.Label>
          <Form.Control
            type="text"
            name="bank"
            disabled={loading}
            value={agent.bank || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>{t('bankAgency')}</Form.Label>
          <Form.Control
            type="text"
            name="bankAgency"
            disabled={loading}
            value={agent.bankAgency || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>{t('bankAccount')}</Form.Label>
          <Form.Control
            type="text"
            name="bankAccount"
            disabled={loading}
            value={agent.bankAccount || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
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
        </SFormGroup>
      </SRow>

      {loading ? (
        <Loading />
      ) : (
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <SButton
            onClick={handleSubmitForm}
            disabled={isNotValid(agent, formErrors)}
          >
            {t('saveChanges')}
          </SButton>
        </div>
      )}
    </SFormSignUp>
  );
};

export default ProfileAgent;