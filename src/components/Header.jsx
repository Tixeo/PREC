import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import logo from '../assets/images/logo.jpg';
import { doSignOut } from '../firebase/auth';
import Register from './auth/register';
import Login from './auth/login'; // Importer le composant Login

function Header() {
    const [user, setUser] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false); // Nouvel état pour le modal de connexion

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
        setLoginModalIsOpen(true); // Ouvrir le modal de connexion
    };

    const closeLoginModal = () => {
        setLoginModalIsOpen(false); // Fermer le modal de connexion
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
                            <button className="nav-button" onClick={openLoginModal}>Connexion</button> {/* Ouvrir le modal de connexion */}
                            <button onClick={openModal} className="nav-button">Inscription</button>
                        </>
                    )}
                </nav>
                <button className="hamburger">☰</button>
            </div>

            {/* Modal pour l'inscription */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Modal d'inscription"
            >
                <Register closeModal={closeModal} />
            </Modal>

            {/* Modal pour la connexion */}
            <Modal
                isOpen={loginModalIsOpen}
                onRequestClose={closeLoginModal}
                contentLabel="Modal de connexion"
            >
                <Login closeModal={closeLoginModal} /> {/* Passer la fonction pour fermer le modal */}
            </Modal>
        </header>
    );
}

export default Header;
