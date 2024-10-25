import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Carousel from './components/Carousel';
import ProductList from './components/ProductList';
import Wishlist from './components/Wishlist';
import Login from './components/auth/login';
import Register from './components/auth/register';
import SettingsPage from './pages/Setting';
import { AuthProvider } from './contexts/authContext';
import './styles/global.css';
import './styles/style.css';
import './styles/wishlist.css';
import './styles/register.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

function AppContent() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';

    return (
        <>
            {!isLoginPage && !isRegisterPage && <Header />}
            <Routes>
                <Route path="/" element={
                    <main>
                        <Carousel />
                        <ProductList />
                    </main>
                } />
                <Route path="/ma-liste" element={<Wishlist />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/parametre" element={<SettingsPage />} />
            </Routes>
            {!isLoginPage && !isRegisterPage && <Footer />}
        </>
    );
}

export default App;