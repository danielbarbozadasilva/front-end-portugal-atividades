import React from 'react';
import AgentAction from '../../../../../store/agent/agent.action';
import { useAppDispatch } from '../../../../../hooks';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import SignUpAgentComponent from '../../../../../components/portal/auth/signup/agent/index';
import { ISignUpInterface, PageTitle } from './types';

const SignUpAgentPage: React.FC<PageTitle> = ({ title }) => {
  const dispatch = useAppDispatch();
  const agentAction = new AgentAction();
  const navigate = useNavigate();

  const submitForm = async (form: ISignUpInterface) => {
    const result = await dispatch(await agentAction.createAgentAction(form as any));
    if (result.payload) {
      navigate('/');
    }
  };

  return (
    <>
      <Helmet title={title} />
      <SignUpAgentComponent submit={submitForm} />
    </>
  );
};

export default SignUpAgentPage;