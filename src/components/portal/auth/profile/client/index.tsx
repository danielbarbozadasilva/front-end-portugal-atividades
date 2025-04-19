import React, { useState, ChangeEvent, FocusEvent } from 'react';
import { useAppSelector } from '../../../../../hooks';
import { Col, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Loading from '../../../../loading/form/index';
import { IProfileClient, ProfileClientProps, TFormErrors } from './types';
import { fieldValidate, formatDocByCountry, formatPhoneByCountry, isNotValid } from './validate';
import { SButton, SFormGroup, SFormSignUp, SRow, STextForm } from './styled';

const ProfileClient: React.FC<ProfileClientProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const loading: boolean = useAppSelector((state) => state.auth.loading);

  const [client, setClient] = useState<IProfileClient>({
    name: '',
    email: '',
    documentValue: '',
    country: 'Brazil',
    mobilePhone: '',
    whatsapp: '',
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    birthDate: '',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState<TFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleChange(e: ChangeEvent<any>) {
    const { name, value } = e.target;
    setClient((prev) => ({ ...prev, [name]: value }));

    const msg = fieldValidate(name, value, { ...client, [name]: value }, t);
    setFormErrors((prev) => ({ ...prev, [name]: msg }));
  }

  function handleDocumentBlur(e: FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name !== 'documentValue') return;

    setClient((prev) => ({
      ...prev,
      documentValue: formatDocByCountry(value, prev.country)
    }));
  }

  function handlePhoneBlur(e: FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name !== 'mobilePhone' && name !== 'whatsapp') return;

    setClient((prev) => ({
      ...prev,
      [name]: formatPhoneByCountry(value, prev.country)
    }));
  }

  function handleSubmit() {
    if (isNotValid(client, formErrors)) {
      return;
    }
    onSubmit(client);
  }

  return (
    <SFormSignUp autoComplete="off">
      <STextForm>{t('profile.clientTitle')}</STextForm>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            {t('name')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            name="name"
            value={client.name}
            onChange={handleChange}
            onBlur={handleChange}
            disabled={loading}
            isInvalid={!!formErrors.name}
            placeholder={t('placeholder.name') || ''}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.name}
          </Form.Control.Feedback>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>
            {t('email')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={client.email}
            onChange={handleChange}
            onBlur={handleChange}
            disabled={loading}
            isInvalid={!!formErrors.email}
            placeholder={t('placeholder.email') || ''}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.email}
          </Form.Control.Feedback>
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            {t('documentValue')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            name="documentValue"
            value={client.documentValue}
            onChange={handleChange}
            onBlur={handleDocumentBlur}
            disabled={loading}
            isInvalid={!!formErrors.documentValue}
            placeholder={t('placeholder.documentValue') || ''}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.documentValue}
          </Form.Control.Feedback>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>
            {t('country')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Select
            name="country"
            value={client.country}
            onChange={handleChange}
            onBlur={handleChange}
            disabled={loading}
            isInvalid={!!formErrors.country}
          >
            <option value="Brazil">Brazil</option>
            <option value="Portugal">Portugal</option>
            <option value="United States">United States</option>
            <option value="France">France</option>
            <option value="Spain">Spain</option>
            <option value="UK">United Kingdom</option>
            <option value="England">England</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formErrors.country}
          </Form.Control.Feedback>
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            {t('mainPhone')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            name="mobilePhone"
            value={client.mobilePhone}
            onChange={handleChange}
            onBlur={handlePhoneBlur}
            disabled={loading}
            isInvalid={!!formErrors.mobilePhone}
            placeholder={t('placeholder.mainPhone') || ''}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.mobilePhone}
          </Form.Control.Feedback>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>{t('whatsapp')}</Form.Label>
          <Form.Control
            name="whatsapp"
            value={client.whatsapp || ''}
            onChange={handleChange}
            onBlur={handlePhoneBlur}
            disabled={loading}
          />
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            {t('zipCode')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            name="zipCode"
            value={client.zipCode}
            onChange={handleChange}
            disabled={loading}
            isInvalid={!!formErrors.zipCode}
            placeholder={t('placeholder.zipCode') || ''}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.zipCode}
          </Form.Control.Feedback>
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            {t('street')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            name="street"
            value={client.street}
            onChange={handleChange}
            disabled={loading}
            isInvalid={!!formErrors.street}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.street}
          </Form.Control.Feedback>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>
            {t('number')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            name="number"
            value={client.number}
            onChange={handleChange}
            disabled={loading}
            isInvalid={!!formErrors.number}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.number}
          </Form.Control.Feedback>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>{t('complement')}</Form.Label>
          <Form.Control
            name="complement"
            value={client.complement || ''}
            onChange={handleChange}
            disabled={loading}
          />
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            {t('neighborhood')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            name="neighborhood"
            value={client.neighborhood}
            onChange={handleChange}
            disabled={loading}
            isInvalid={!!formErrors.neighborhood}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.neighborhood}
          </Form.Control.Feedback>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>
            {t('city')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            name="city"
            value={client.city}
            onChange={handleChange}
            disabled={loading}
            isInvalid={!!formErrors.city}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.city}
          </Form.Control.Feedback>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>
            {t('state')} <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            name="state"
            value={client.state}
            onChange={handleChange}
            disabled={loading}
            isInvalid={!!formErrors.state}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.state}
          </Form.Control.Feedback>
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>{t('password')}</Form.Label>
          <InputGroup>
            <Form.Control
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={client.password || ''}
              onChange={handleChange}
              disabled={loading}
              isInvalid={!!formErrors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.password}
            </Form.Control.Feedback>
            <InputGroup.Text
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? t('hide') : t('show')}
            </InputGroup.Text>
          </InputGroup>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>{t('confirmPassword')}</Form.Label>
          <InputGroup>
            <Form.Control
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={client.confirmPassword || ''}
              onChange={handleChange}
              disabled={loading}
              isInvalid={!!formErrors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.confirmPassword}
            </Form.Control.Feedback>
            <InputGroup.Text
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ cursor: 'pointer' }}
            >
              {showConfirmPassword ? t('hide') : t('show')}
            </InputGroup.Text>
          </InputGroup>
        </SFormGroup>
      </SRow>

      {loading ? (
        <Loading />
      ) : (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <SButton
            type="button"
            onClick={handleSubmit}
            disabled={isNotValid(client, formErrors)}
          >
            {t('submit')}
          </SButton>
        </div>
      )}
    </SFormSignUp>
  );
};

export default ProfileClient;