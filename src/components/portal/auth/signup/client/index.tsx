import React, { useState, ChangeEvent } from 'react';
import moment from 'moment';
import { Col, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../../hooks';
import Loading from '../../../../loading/form/index';
import { fieldValidate, formatDocumentValue, formatPhoneByCountry, isNotValid } from './validations';
import { IClient, SignUpProps, TFormErrors } from './types';
import { SButton, SFormGroup, SFormSignUp, SRow, STextForm } from './styled';

const SignUpClientComponent: React.FC<SignUpProps> = ({ submit }) => {
  const { t } = useTranslation();
  const loading: boolean = useAppSelector((state) => state.auth.loading);
  const [formValidate, setFormValidate] = useState<TFormErrors>({});
  const [client, setClient] = useState<IClient>({
    username: '',
    name: '',
    birthDate: new Date(),
    country: '',
    documentType: '',
    documentValue: '',
    phones: ['', ''],
    email: '',
    password: '',
    confirmPassword: '',
    address: {
      street: '',
      number: '',
      complement: '',
      district: '',
      city: '',
      state: '',
      zipCode: ''
    },
    interests: []
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const interestKeys = [
    'tourWalk',
    'tourExcursion',
    'tourEvent',
    'tourTrail',
    'tourOther'
  ];

  const submitForm = () => {
    const newClient: IClient = {
      ...client,
      phones: [client.phones[0] || '', client.phones[1] || ''],
      birthDate: new Date(client.birthDate)
    };
    submit(newClient);
  };

  const handleChange = (event: ChangeEvent<any>) => {
    const { name, value } = event.target;
    const msg = fieldValidate(name, value, client, t);
    setFormValidate((prev) => ({ ...prev, [name]: msg }));

    if (name === 'phones0') {
      setClient((prev) => ({
        ...prev,
        phones: [value, prev.phones[1]]
      }));
      return;
    }
    if (name === 'phones1') {
      setClient((prev) => ({
        ...prev,
        phones: [prev.phones[0], value]
      }));
      return;
    }
    if (
      [
        'street',
        'number',
        'complement',
        'district',
        'city',
        'state',
        'zipCode'
      ].includes(name)
    ) {
      setClient((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }));
      return;
    }

    setClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleBirthDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const msg = fieldValidate('birthDate', inputValue, client, t);
    setFormValidate((prev) => ({ ...prev, birthDate: msg }));

    setClient((prev) => ({
      ...prev,
      birthDate: new Date(inputValue)
    }));
  };

  const formatBirthDate = (date: Date) => {
    if (!date) return '';
    return moment(date).format('YYYY-MM-DD');
  };

  const handleDocumentTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const docType = e.target.value;
    const msg = fieldValidate(
      'documentValue',
      client.documentValue,
      { ...client, documentType: docType },
      t
    );
    setFormValidate((prev) => ({ ...prev, documentValue: msg }));

    const formatted = formatDocumentValue(client.documentValue, docType);
    setClient((prev) => ({
      ...prev,
      documentType: docType,
      documentValue: formatted
    }));
  };

  const handleDocumentValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const msg = fieldValidate('documentValue', value, client, t);
    setFormValidate((prev) => ({ ...prev, documentValue: msg }));

    const formatted = formatDocumentValue(value, client.documentType);
    setClient((prev) => ({
      ...prev,
      documentValue: formatted
    }));
  };

  const handleInterestsChange = (interest: string) => {
    setClient((prev) => {
      const alreadySelected = prev.interests.includes(interest);
      let updatedInterests = [];
      if (alreadySelected) {
        updatedInterests = prev.interests.filter((i) => i !== interest);
      } else {
        updatedInterests = [...prev.interests, interest];
      }
      return { ...prev, interests: updatedInterests };
    });
  };

  return (
    <SFormSignUp autoComplete="off">
      <STextForm>{t('signup')}</STextForm>
      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('name')}:
          </Form.Label>
          <Form.Control
            disabled={loading}
            type="text"
            id="name"
            name="name"
            placeholder={t('placeholder.name') || ''}
            value={client.name}
            onChange={handleChange}
            isInvalid={!!formValidate.name}
            autoFocus
          />
          <Form.Control.Feedback type="invalid">
            {formValidate.name || ''}
          </Form.Control.Feedback>
        </SFormGroup>
        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('username')}:
          </Form.Label>
          <Form.Control
            disabled={loading}
            type="text"
            id="username"
            name="username"
            placeholder={t('placeholder.username') || ''}
            value={client.username}
            onChange={handleChange}
            isInvalid={!!formValidate.username}
          />
          <Form.Control.Feedback type="invalid">
            {formValidate.username || ''}
          </Form.Control.Feedback>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('email')}:
          </Form.Label>
          <Form.Control
            disabled={loading}
            type="email"
            id="email"
            name="email"
            placeholder={t('placeholder.email') || ''}
            value={client.email}
            onChange={handleChange}
            isInvalid={!!formValidate.email}
          />
          <Form.Control.Feedback type="invalid">
            {formValidate.email || ''}
          </Form.Control.Feedback>
          <Form.Text>{/* Texto de ajuda se necessário */}</Form.Text>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('birthDate')}:
          </Form.Label>
          <Form.Control
            disabled={loading}
            type="date"
            id="birthDate"
            name="birthDate"
            value={formatBirthDate(client.birthDate)}
            onChange={handleBirthDateChange}
            isInvalid={!!formValidate.birthDate}
          />
          <Form.Control.Feedback type="invalid">
            {formValidate.birthDate || ''}
          </Form.Control.Feedback>
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('country')}
          </Form.Label>
          <Form.Select
            id="country"
            name="country"
            aria-label={t('country')}
            value={client.country}
            onChange={handleChange}
            disabled={loading}
            isInvalid={!!formValidate.country}
          >
            <option value="">{t('placeholder.country')}</option>
            <option value="Portugal">Portugal</option>
            <option value="Brazil">Brazil</option>
            <option value="England">England</option>
            <option value="United States">United States</option>
            <option value="France">France</option>
            <option value="Spain">Spain</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formValidate.country || ''}
          </Form.Control.Feedback>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('documentType')}:
          </Form.Label>
          <Form.Select
            id="documentType"
            name="documentType"
            value={client.documentType}
            onChange={handleDocumentTypeChange}
            disabled={loading}
          >
            <option value="">{t('placeholder.documentType')}</option>
            <option value="CPF">CPF (Brasil)</option>
            <option value="Passaporte">Passaporte</option>
          </Form.Select>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('documentValue')}:
          </Form.Label>
          <Form.Control
            disabled={loading}
            type="text"
            id="documentValue"
            name="documentValue"
            placeholder={t('placeholder.documentValue') || ''}
            value={client.documentValue}
            onChange={handleDocumentValueChange}
            isInvalid={!!formValidate.documentValue}
          />
          <Form.Control.Feedback type="invalid">
            {formValidate.documentValue || ''}
          </Form.Control.Feedback>
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('mainPhone')}:
          </Form.Label>
          <Form.Control
            disabled={loading}
            type="tel"
            id="phones0"
            name="phones0"
            placeholder={t('placeholder.mainPhone') || ''}
            value={formatPhoneByCountry(
              client.phones[0]
            )}
            onChange={handleChange}
            isInvalid={!!formValidate.phones0}
          />
          <Form.Control.Feedback type="invalid">
            {formValidate.phones0 || ''}
          </Form.Control.Feedback>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>{t('optionalPhone')}:</Form.Label>
          <Form.Control
            disabled={loading}
            type="tel"
            id="phones1"
            name="phones1"
            placeholder={t('placeholder.optionalPhone') || ''}
            value={formatPhoneByCountry(
              client.phones[1]
            )}
            onChange={handleChange}
            isInvalid={!!formValidate.phones1}
          />
          <Form.Control.Feedback type="invalid">
            {formValidate.phones1 || ''}
          </Form.Control.Feedback>
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('zipCode')}:
          </Form.Label>
          <Form.Control
            disabled={loading}
            type="text"
            id="zipCode"
            name="zipCode"
            placeholder={t('placeholder.zipCode') || ''}
            value={client.address.zipCode}
            onChange={handleChange}
            isInvalid={!!formValidate.zipCode}
          />
          <Form.Control.Feedback type="invalid">
            {formValidate.zipCode || ''}
          </Form.Control.Feedback>
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('street')}:
          </Form.Label>
          <Form.Control
            disabled={loading}
            type="text"
            id="street"
            name="street"
            placeholder={t('placeholder.street') || ''}
            value={client.address.street}
            onChange={handleChange}
            isInvalid={!!formValidate.street}
          />
          <Form.Control.Feedback type="invalid">
            {formValidate.street || ''}
          </Form.Control.Feedback>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('number')}:
          </Form.Label>
          <Form.Control
            disabled={loading}
            type="text"
            id="number"
            name="number"
            placeholder={t('placeholder.number') || ''}
            value={client.address.number}
            onChange={handleChange}
            isInvalid={!!formValidate.number}
          />
          <Form.Control.Feedback type="invalid">
            {formValidate.number || ''}
          </Form.Control.Feedback>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>{t('complement')}:</Form.Label>
          <Form.Control
            disabled={loading}
            type="text"
            id="complement"
            name="complement"
            placeholder={t('placeholder.complement') || ''}
            value={client.address.complement || ''}
            onChange={handleChange}
          />
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('district')}:
          </Form.Label>
          <Form.Control
            disabled={loading}
            type="text"
            id="district"
            name="district"
            placeholder={t('placeholder.district') || ''}
            value={client.address.district}
            onChange={handleChange}
            isInvalid={!!formValidate.district}
          />
          <Form.Control.Feedback type="invalid">
            {formValidate.district || ''}
          </Form.Control.Feedback>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('city')}:
          </Form.Label>
          <Form.Control
            disabled={loading}
            type="text"
            id="city"
            name="city"
            placeholder={t('placeholder.city') || ''}
            value={client.address.city}
            onChange={handleChange}
            isInvalid={!!formValidate.city}
          />
          <Form.Control.Feedback type="invalid">
            {formValidate.city || ''}
          </Form.Control.Feedback>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('stateUF')}:
          </Form.Label>
          <Form.Control
            disabled={loading}
            type="text"
            id="state"
            name="state"
            placeholder={t('placeholder.stateUF') || ''}
            value={client.address.state}
            onChange={handleChange}
            isInvalid={!!formValidate.state}
          />
          <Form.Control.Feedback type="invalid">
            {formValidate.state || ''}
          </Form.Control.Feedback>
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('password')}:
          </Form.Label>
          <InputGroup>
            <Form.Control
              disabled={loading}
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder={t('placeholder.password') || ''}
              value={client.password}
              onChange={handleChange}
              isInvalid={!!formValidate.password}
            />
            <Form.Control.Feedback type="invalid">
              {formValidate.password || ''}
            </Form.Control.Feedback>
            <InputGroup.Text
              style={{ cursor: 'pointer' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? t('hide') : t('show')}
            </InputGroup.Text>
          </InputGroup>
        </SFormGroup>

        <SFormGroup as={Col}>
          <Form.Label>
            <span style={{ color: 'red' }}>*</span> {t('confirmPassword')}:
          </Form.Label>
          <InputGroup>
            <Form.Control
              disabled={loading}
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder={t('placeholder.confirmPassword') || ''}
              value={client.confirmPassword}
              onChange={handleChange}
              isInvalid={!!formValidate.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {formValidate.confirmPassword || ''}
            </Form.Control.Feedback>
            <InputGroup.Text
              style={{ cursor: 'pointer' }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? t('hide') : t('show')}
            </InputGroup.Text>
          </InputGroup>
        </SFormGroup>
      </SRow>

      <SRow>
        <SFormGroup as={Col}>
          <Form.Label>{t('interests')} (opcional):</Form.Label>
          <div>
            {interestKeys.map((key) => (
              <Form.Check
                key={key}
                type="checkbox"
                label={t(key)}
                value={key}
                checked={client.interests.includes(key)}
                onChange={() => handleInterestsChange(key)}
              />
            ))}
          </div>
        </SFormGroup>
      </SRow>

      {loading ? (
        <Loading />
      ) : (
        <SButton
          type="button"
          onClick={submitForm}
          disabled={isNotValid(client, formValidate)}
        >
          {t('submit')}
        </SButton>
      )}
    </SFormSignUp>
  );
};

export default SignUpClientComponent;