import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import logo from '../../assets/images/logo.jpg';
import { doSignOut } from '../../firebase/auth';
import Register from '../auth/register';
import Login from '../auth/login';

function Header() {
    const [user, setUser] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await doSignOut();
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const openLoginModal = () => {
        setLoginModalIsOpen(true);
    };

    const closeLoginModal = () => {
        setLoginModalIsOpen(false);
    };

    return (
        <header>
            <div className="logo">
                <img src={logo} alt="Logo Pois Rayures et Caro" className="logo-img" />
                <a href="/" className="site-title">
                    <h1>Pois Rayures et Caro</h1>
                </a>
            </div>

            <div className="header-center">
                <div className="search-bar">
                    <input type="search" placeholder="Rechercher..." />
                    <button type="submit">🔍</button>
                </div>
            </div>

            <div className="header-right">
                <button className="fidelity-button" disabled>Fidélité</button>
                <nav className="nav-buttons">
                    <a href="/ma-liste"><button className="nav-button">Ma liste</button></a>
                    {user ? (
                        <>
                            <a href="/parametre"><button className="nav-button">Paramètres</button></a>
                            <button onClick={handleSignOut} className="nav-button">Déconnexion</button>
                        </>
                    ) : (
                        <>
                            <button className="nav-button" onClick={openLoginModal}>Connexion</button>
                            <button onClick={openModal} className="nav-button">Inscription</button>
                        </>
                    )}
                </nav>
                <button className="hamburger">☰</button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Modal d'inscription"
            >
                <Register closeModal={closeModal} />
            </Modal>

            <Modal
                isOpen={loginModalIsOpen}
                onRequestClose={closeLoginModal}
                contentLabel="Modal de connexion"
            >
                <Login closeModal={closeLoginModal} />
            </Modal>
        </header>
    );
}

export default Header;
