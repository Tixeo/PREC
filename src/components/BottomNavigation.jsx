import React, { useState } from 'react';
import { Home, User, Star, Settings, Shield, UserPlus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Register from './auth/register';
import Login from './auth/login';
import Modal from 'react-modal';

const BottomNavigation = ({ user, isAdmin}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const location = useLocation();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const openLoginModal = () => setLoginModalIsOpen(true);
  const closeLoginModal = () => setLoginModalIsOpen(false);
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  if (!user) {
    return (
      <nav className="bottom-navigation">
        <div className="nav-container">
          <a href="/" className={`nav-link ${isActive('/') ? 'active-nav-link' : ''}`}>
            <Home size={20} />
          </a>
          
          <a href="/ma-liste" className={`nav-link ${isActive('/ma-liste') ? 'active-nav-link' : ''}`}>
            <Star size={20} />
          </a>
          
          <a onClick={() => {openLoginModal(); closeModal();}} className="nav-link">
            <User size={20} />
          </a>
          
          <a onClick={() => {openModal(); closeLoginModal();}} className="nav-link">
            <UserPlus size={20} />
          </a>
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
      </nav>
    );
  }

  return (
    <nav className="bottom-navigation">
      <div className={`nav-container ${isAdmin ? 'admin-nav' : ''}`}>
        <a href="/" className={`nav-link ${isActive('/') ? 'active-nav-link' : ''}`}>
          <Home size={20} />
        </a>
        
        <a href="/ma-liste" className={`nav-link ${isActive('/ma-liste') ? 'active-nav-link' : ''}`}>
          <Star size={20} />
        </a>
        
        <a href="/settings" className={`nav-link ${isActive('/settings') ? 'active-nav-link' : ''}`}>
          <Settings size={20} />
        </a>

        {isAdmin && (
          <a href="/admin" className={`nav-link ${isActive('/admin') ? 'active-nav-link' : ''}`}>
            <Shield size={20} />
          </a>
        )}
      </div>
    </nav>
  );
};

export default BottomNavigation;