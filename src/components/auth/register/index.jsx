import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContext'
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth'

const Register = ({ closeModal }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isRegistering) {
            setIsRegistering(true)
            try {
                await doCreateUserWithEmailAndPassword(email, password)
                closeModal()
            } catch (error) {
                setErrorMessage("Erreur lors de la création du compte.")
                setIsRegistering(false)
            }
        }
    }

    return (
        <div className="container">
            <div className='headerRegister'>
                <h1 className='h1Register'>Bienvenue</h1>
                <button onClick={closeModal} className='closeRegister'>
                    <MaterialSymbolsCloseRounded />
                </button>
            </div>
            <form onSubmit={onSubmit} className='formRegister'>
                <label className='labelRegister'>
                    Email
                </label>
                <input
                    type="email"
                    autoComplete='email'
                    required
                    value={email} onChange={(e) => { setEmail(e.target.value) }}
                    className='inputRegister'
                />

                <label className='labelRegister'>
                    Mot de passe
                </label>
                <input
                    disabled={isRegistering}
                    type="password"
                    autoComplete='new-password'
                    required
                    value={password} onChange={(e) => { setPassword(e.target.value) }}
                    className='inputRegister'
                />

                <label className='labelRegister'>
                    Confirmer le mot de passe
                </label>
                <input
                    disabled={isRegistering}
                    type="password"
                    autoComplete='off'
                    required
                    value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }}
                    className='inputRegister'
                />

                {errorMessage && (
                    <span className='error'>{errorMessage}</span>
                )}

                <button
                    type="submit"
                    disabled={isRegistering}
                >
                    {isRegistering ? 'Création en cours...' : 'Créer le compte'}
                </button>

                <div className="forgot-password">
                    Vous avez déjà un compte ?{' '}
                    <Link to={'/login'} onClick={closeModal}>Se connecter</Link>
                </div>
            </form>
        </div>
    )
}

export default Register



export function MaterialSymbolsCloseRounded(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"></path></svg>);
}