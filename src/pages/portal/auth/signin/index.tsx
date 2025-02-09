import React from 'react'
import AuthAction from '../../../../store/auth/auth.action'
import FormSignIn from '../../../../components/portal/auth/signin'
import { TypeSignIn } from '../../../types'
import { Helmet } from 'react-helmet'
import { PageTitle } from './types'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../store'
import { useNavigate } from 'react-router-dom'

const SignIn: React.FC<PageTitle> = ({ title }) => {
  const dispatch = useDispatch<AppDispatch>()
  const authAction = new AuthAction()
  const navigate = useNavigate()

  const submitForm = async (form: TypeSignIn) => {
    const result = await dispatch(authAction.signInAction(form))    
    if (result.payload.data?.permissions?.includes('administrator')) {
      navigate('/dashboard')
    } else if (result.payload.data?.permissions?.includes('client')) {
      navigate('/')
    }
  }

  return (
    <>
      <Helmet title={title} />
      <FormSignIn submit={submitForm} />
    </>
  )
}

export default SignIn
