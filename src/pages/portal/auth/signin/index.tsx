import React from 'react';
import { AuthAction } from '../../../../store/auth/auth.action';
import SignInClientComponent from '../../../../components/portal/auth/signin/index';
import { TypeSignIn } from '../../../types';
import { Helmet } from 'react-helmet';
import { PageTitle } from './types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store';
import { useNavigate } from 'react-router-dom';
export interface IAuthResponse {
  payload: {
    data: {
      token: string;
      username: string;
      name: string;
      email: string;
      permissions: string;
    }
  }
}
const SignIn: React.FC<PageTitle> = ({ title }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authAction = new AuthAction();

  const submitForm = async (form: TypeSignIn): Promise<void> => {
    const result: any = await dispatch(await authAction.signInAction(form));
    if (result.payload.data?.permissions?.includes('administrator')) {
      navigate('/dashboard');
    } else if (result.payload.data?.permissions?.includes('client')) {
      navigate('/');
    }
  };

  return (
    <>
      <Helmet title={title} />
      <SignInClientComponent submit={submitForm} />
    </>
  );
};

export default SignIn;
