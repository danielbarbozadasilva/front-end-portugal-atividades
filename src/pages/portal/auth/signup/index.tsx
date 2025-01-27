import React from 'react'
import ClientAction from '../../../../store/client/client.action'
import { useAppDispatch } from '../../../../hooks'
import FormSignUp from '../../../../components/portal/auth/signup'
import { TypeSignUp } from '../../../types'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { PageTitle } from './types'

const SignUp: React.FC<PageTitle> = ({ title }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const clientAction = new ClientAction()
  const submitForm = async (form: any) => {
    dispatch(clientAction.updateClientAction(form)).then(() => {
      navigate('/signin')
    })
  }

  return (
    <>
      <Helmet title={title} />
      <FormSignUp submit={submitForm} />
    </>
  )
}
export default SignUp
