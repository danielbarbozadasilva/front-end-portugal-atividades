import React from 'react'
import { AuthAction } from '../../../../store/auth/auth.action'
import FormChangePassword from '../../../../components/portal/auth/changePassword/index'
import { Helmet } from 'react-helmet'
import { useAppDispatch } from '../../../../hooks'

const ChangePasswordPage: React.FC<{ title: string }> = ({ title }) => {
    const dispatch = useAppDispatch();
    const authAction = new AuthAction()

    const submitForm = async (form: any) => {
        dispatch(await authAction.resetPassword(form))
    }

    return (
        <>
            <Helmet title={title} />
            <FormChangePassword submit={submitForm} />
        </>
    )
}

export default ChangePasswordPage