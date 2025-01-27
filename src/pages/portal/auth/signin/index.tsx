import React, { useEffect } from 'react'
import AuthAction from '../../../../store/auth/auth.action'
import { useAppDispatch } from '../../../../hooks'
import FormSignIn from '../../../../components/portal/auth/signin'
import { TypeSignIn } from '../../../types'
import { Helmet } from 'react-helmet'
import { PageTitle } from './types'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../store'

const SignIn: React.FC<PageTitle> = ({ title }) => {
  const dispatch = useDispatch<AppDispatch>()
  const authAction = new AuthAction()
  const submitForm = async (form: TypeSignIn) => {
    dispatch(authAction.signInAction(form))
  }

  return (
    <>
      <Helmet title={title} />
      <FormSignIn submit={submitForm} />
    </>
  )
}
export default SignIn
