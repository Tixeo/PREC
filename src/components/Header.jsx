import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { auth, db } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import logo from '../assets/images/logo.jpg';
import Register from './auth/register';
import Login from './auth/login';
import '../styles/header.css';
import { getThemeForDate } from '../styles/ThemeManager';

const Header = () => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null);

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchExpanded(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
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

    const toggleSearch = () => {
        setIsSearchExpanded(true);
    };

    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Logo Pois Rayures et Caro" className="logo-img" />
                <a href="/" className="site-title">
                    <h1>
                        <span style={{ color: 'var(--title-first-part)' }}>Pois Rayures</span>
                        <span style={{ color: 'var(--title-second-part)' }}> et Caro</span>
                    </h1>
                </a>
            </div>

            <div className="header-center">
                <form onSubmit={handleSearch} className={`search-bar ${isSearchExpanded ? 'expanded' : ''}`} ref={searchRef}>
                    <input
                        type="search"
                        placeholder="Rechercher..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClick={toggleSearch}
                    />
                    <button type="submit">
                        <span className="search-icon">{getThemeForDate().searchIcon}</span>
                    </button>
                </form>
            </div>

            <div className="header-right">
                <nav className="nav-buttons">
                    {user ? (
                        <>
                            <a href="#" className="nav-button loyalty-button"  disabled>
                                Fidélité
                            </a>
                            <a href="/ma-liste" className="nav-button">
                                Ma liste
                            </a>
                            <a href="/settings" className="nav-button">
                                Paramètres
                            </a>
                            {isAdmin && (
                                <a href="/admin" className="nav-button admin-button">
                                    Administration
                                </a>
                            )}
                        </>
                    ) : (
                        <>
                            <button className="nav-button" onClick={openLoginModal}>
                                Connexion
                            </button>
                            <button onClick={openModal} className="nav-button">
                                Inscription
                            </button>
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
    );
};

export default Header;
