import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { auth, db } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import logo from '../assets/images/logo.jpg';
import Register from './auth/register';
import Login from './auth/login';

function Header() {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const userDocRef = doc(db, 'Users', currentUser.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists() && userDoc.data().admin === true) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
            }
        });

        return () => unsubscribe();
    }, []);


    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const openLoginModal = () => setLoginModalIsOpen(true);
    const closeLoginModal = () => setLoginModalIsOpen(false);

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`); 
        }
    };

    return (
        <>
            <header>
                <div className="logo">
                    <img src={logo} alt="Logo Pois Rayures et Caro" className="logo-img" />
                    <a href="/" className="site-title">
                        <h1>Pois Rayures et Caro</h1>
                    </a>
                </div>

                <div className="header-center">
                    <form onSubmit={handleSearch} className="search-bar">
                        <input 
                            type="search" 
                            placeholder="Rechercher..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit">🔍</button>
                    </form>
                </div>

                <div className="header-right">
                    <nav className="nav-buttons">
                        {user ? (
                            <>
                                <button className="fidelity-button" disabled>Fidélité</button>
                                <a href="/ma-liste"><button className="nav-button">Ma liste</button></a>
                                <a href="/settings"><button className="nav-button">Paramètres</button></a>
                                {isAdmin && (
                                    <a href="/admin">
                                        <button style={{ backgroundColor: 'red', color: 'white' }} className="nav-button admin-button">Administration</button>
                                    </a>
                                )}
                            </>
                        ) : (
                            <>
                                <button className="nav-button" onClick={openLoginModal}>Connexion</button>
                                <button onClick={openModal} className="nav-button">Inscription</button>
                            </>
                        )}
                    </nav>
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
        </>
    );
}

export default Header;