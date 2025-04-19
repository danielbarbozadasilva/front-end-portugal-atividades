import React from 'react';
import { ClientAction } from '../../../../../store/client/client.action';
import { useAppDispatch } from '../../../../../hooks';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import SignUpClientComponent from '../../../../../components/portal/auth/signup/client/index';
import { ISignUpInterface, SignUpProps } from './types';

const SignUpClientPage: React.FC<SignUpProps> = ({ title }) => {
  const dispatch = useAppDispatch();
  const clientAction = new ClientAction();
  const navigate = useNavigate();

  const submitForm = async (form: ISignUpInterface) => {
    const result = await dispatch(await clientAction.createClientAction(form));
    if (result.payload) {
      navigate('/');
    }
  };

  return (
    <>
      <Helmet title={title} />
      <SignUpClientComponent submit={submitForm} />
    </>
  );
};

export default SignUpClientPage;
