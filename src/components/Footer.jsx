import React from 'react';
import sousLogo from '../assets/images/sous-logo.jpg';

function Footer() {
    return (
        <footer>
            <div className="footer-logo">
                <img src={sousLogo} alt="Logo Pois Rayures et Caro" />
            </div>

            <div className="footer-address">
                <a href="https://www.google.com/maps/dir//6+Rue+de+Verrue,+50550+Saint-Vaast-la-Hougue,+France">6 Rue de Verrue, 50550 Saint-Vaast-la-Hougue, France</a>
                <p>Saint-Vaast-la-Hougue, France</p>
            </div>

            <div className="footer-contact">
                <p>Contact: 02 33 20 13 45</p>
                <div className="footer-links">
                    <a href="https://www.facebook.com/profile.php?id=100058107847441&locale=fr_FR">Facebook</a>
                    <a href="/terms-of-service">Conditions d'utilisation</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
