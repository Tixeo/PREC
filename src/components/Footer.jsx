import React from 'react';
import sousLogo from '../assets/images/sous-logo.jpg';

function Footer() {
    return (
        <footer>
            <div className="footer-logo">
                <img src={sousLogo} alt="Logo Pois Rayures et Caro" />
            </div>

            <div className="footer-address">
                <p>Rue de Verrue, 50550 Saint-Vaast-la-Hougue, France</p>
                <p>Saint-Vaast-la-Hougue, France</p>
            </div>

            <div className="footer-contact">
                <p>Contact: 02 33 20 13 45</p>
                <div className="footer-links">
                    <a href="#">Facebook</a>
                    <a href="#">Conditions d'utilisation</a>
                    <a href="#">Terms of services</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
