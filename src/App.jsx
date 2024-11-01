import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import { Helmet } from 'react-helmet';

const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));
const Carousel = lazy(() => import('./components/Carousel'));
const ProductList = lazy(() => import('./components/ProductList'));
const Search = lazy(() => import('./components/Search'));
const Wishlist = lazy(() => import('./components/Wishlist'));
const SettingsPage = lazy(() => import('./components/Setting'));
const Login = lazy(() => import('./components/auth/login'));
const Register = lazy(() => import('./components/auth/register'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const ProductPage = lazy(() => import('./components/ProductPage'));
const NotFound = lazy(() => import('./components/404'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));

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
    
    const getPageTitle = () => {
        switch(location.pathname) {
            case '/':
                return 'Accueil';
            case '/search':
                return 'Recherche';
            case '/ma-liste':
                return 'Ma Liste de Souhaits';
            case '/settings':
                return 'Paramètres';
            case '/admin':
                return 'Panneau d\'Administration';
            case '/terms-of-service':
                return 'Conditions d\'Utilisation';
            default:
                if (location.pathname.startsWith('/products/')) {
                    return 'Détails du Produit';
                }
                return 'Page Non Trouvée | 404';
        }
    };

    return (
        <>
            <Helmet>
                <title>{getPageTitle()}</title>
                <link rel="icon" href="src/assets/images/sous-logo.jpg" />
            </Helmet>

            <Header />
            <Suspense fallback={<div>Chargement...</div>}>
                <Routes>
                    <Route path="/" element={
                        <main>
                            <Carousel />
                            <ProductList />
                        </main>
                    } />
                    <Route path="/search" element={<Search />} />
                    <Route path="/ma-liste" element={<Wishlist />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/products/:productId" element={<ProductPage />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
            <Footer />
        </>
    );
}

export default App;
