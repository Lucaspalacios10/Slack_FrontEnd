import React from 'react'
import { Link, useNavigate } from 'react-router'
import useForm from '../../hooks/useForm.jsx'
import { login } from '../../services/authService.js'
import useRequest from '../../hooks/useRequest.jsx'
import { useEffect } from 'react'
import useLogin from '../../hooks/useLogin.jsx'
import './LoginScreen.css'

const LoginScreen = () => {
    const {
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        loading,
        error,
        response
    } = useLogin()
    return (
        <div className="login-container">
            <img className="slack-logo" alt="Slack" src="https://a.slack-edge.com/bv1-13/slack_logo-e971fd7.svg" height="26" title="Slack"></img>
            <h1>Inicia sesion</h1>
            <form onSubmit={onSubmitForm} className='login-form-container'>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onChange={onChangeFieldValue} value={form_state.email} />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" onChange={onChangeFieldValue} value={form_state.password} />
                </div>
                {
                    error && <span style={{ color: 'red' }}>{error.message}</span>
                }
                {
                    response
                    &&
                    response.ok
                    &&
                    <span style={{ color: 'yellowgreen' }}>
                        Te has logueado exitosamente
                    </span>
                }
                <button className="login-button" type="submit" disabled={loading || (response && response.ok)}>Iniciar sesion</button>
            </form>
            <span>
                Aun no tienes cuenta? <Link to="/register">Registrate</Link>
            </span>
        </div>
    )
}

export default LoginScreen