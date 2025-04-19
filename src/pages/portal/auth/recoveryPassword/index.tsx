import React from 'react'
import { useDispatch } from 'react-redux'
import FormRecoveryPassword from '../../../../components/portal/auth/recoveryPassword/index'
import { Helmet } from 'react-helmet'
import { AppDispatch } from '../../../../store'
import { useNavigate } from 'react-router-dom'
import { AuthAction } from '../../../../store/auth/auth.action'

const RecoveryPassword: React.FC<any> = ({ title }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const authAction = new AuthAction();

    const submitForm = async (form: any) => {
        dispatch(await authAction.recoveryPassword(form))
        navigate('/');
    }

    return (
        <>
            <Helmet title={title} />
            <FormRecoveryPassword submit={submitForm} />
        </>
    )
}

export default RecoveryPassword