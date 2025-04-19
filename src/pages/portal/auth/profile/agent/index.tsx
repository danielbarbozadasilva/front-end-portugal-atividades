import React from 'react';
import AgentAction from '../../../../../store/agent/agent.action';
import { useAppDispatch } from '../../../../../hooks';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import SignUpAgentComponent from '../../../../../components/portal/auth/signup/agent/index';

const ProfileAgentPage: React.FC<{ title: string }> = ({ title }) => {
  const dispatch = useAppDispatch();
  const agentAction = new AgentAction();
  const navigate = useNavigate();

  const submitForm = async (form: any) => {
    const result = await dispatch(await agentAction.createAgentAction(form));
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

export default ProfileAgentPage;