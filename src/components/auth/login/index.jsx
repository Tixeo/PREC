import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth'
import { useAuth } from '../../../contexts/authContext'

const Login = ({ closeModal }) => {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleError = (error) => {
        switch (error.code) {
            case 'auth/invalid-email':
                return "L'email fourni est invalide.";
            case 'auth/user-disabled':
                return "Cet utilisateur a été désactivé.";
            case 'auth/user-not-found':
                return "Aucun utilisateur trouvé avec cet email.";
            case 'auth/wrong-password':
                return "Le mot de passe est incorrect.";
            case 'auth/invalid-credential':
                return "Les informations d'identification fournies sont invalides.";
            default:
                return "Une erreur est survenue. Veuillez réessayer.";
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            setErrorMessage('')
            try {
                await doSignInWithEmailAndPassword(email, password)
                closeModal()
            } catch (error) {
                setErrorMessage(handleError(error))
                setIsSigningIn(false)
            }
        }
    }

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            setErrorMessage('')
            doSignInWithGoogle()
                .then(() => {
                    closeModal()
                })
                .catch(err => {
                    setErrorMessage(handleError(err))
                    setIsSigningIn(false)
                })
        }
    }

    return (
        <div className="container">
            <div className='headerRegister'>
                <h1 className='h1Register'>Re-Bonjour</h1>
                <button onClick={closeModal} className='closeRegister'>
                    <MaterialSymbolsCloseRounded />
                </button>
            </div>
            <form onSubmit={onSubmit} className="formRegister">
                <label className="labelRegister">Email</label>
                <input
                    type="email"
                    autoComplete='email'
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    className="inputRegister"
                />
                
                <label className="labelRegister">Mot de passe</label>
                <input
                    type="password"
                    autoComplete='current-password'
                    required
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    className="inputRegister"
                />

                {errorMessage && (
                    <span className='error'>{errorMessage}</span>
                )}

                <button
                    type="submit"
                    disabled={isSigningIn}
                >
                    {isSigningIn ? 'Connexion...' : 'Se connecter'}
                </button>
            </form>
            <p className="forgot-password">
                Vous n'avez pas de compte ?  
                 <Link onClick={closeModal}> S'inscrire</Link>
            </p>
            <div className='flex flex-row text-center w-full'>
                <div className='border-b-2 mb-2.5 mr-2 w-full'></div>
                <div className='or'>ou</div>
                <div className='border-b-2 mb-2.5 ml-2 w-full'></div>
            </div>
            <button
                disabled={isSigningIn}
                onClick={(e) => { onGoogleSignIn(e) }}
                className={`buttonRegister ${isSigningIn ? 'cursor-not-allowed' : 'buttonRegister2'}`}>
                <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_17_40)">
                        <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                        <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                        <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                        <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                    </g>
                    <defs>
                        <clipPath id="clip0_17_40">
                            <rect width="48" height="48" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                {isSigningIn ? 'Connexion...' : 'Continuer avec Google'}
            </button>
        </div>
    )
}

export default Login

export function MaterialSymbolsCloseRounded(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"></path></svg>);
}