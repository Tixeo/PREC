import React from "react";
import "../styles/style.css";
import "../styles/parametre.css";

const SettingsPage = () => {
    return (
        <>
            <main>
                <div className="settings-container">
                    <h2>Paramètres du compte</h2>

                    <div className="settings-profile">
                        <h3>Photo de profil</h3>
                        <div className="profile-picture-section">
                            <img src="/assets/profile-default.jpg" alt="Photo de profil" className="profile-picture" />
                            <div className="profile-upload">
                                <label htmlFor="profile-upload" className="upload-button">Changer la photo</label>
                                <input type="file" id="profile-upload" accept="image/*" hidden />
                            </div>
                        </div>
                    </div>

                    <form className="settings-form">
                        <h3>Informations personnelles</h3>

                        <div className="form-group">
                            <label htmlFor="name">Nom complet</label>
                            <input type="text" id="name" name="name" placeholder="Votre nom" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Adresse e-mail</label>
                            <input type="email" id="email" name="email" placeholder="votre@email.com" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="current-password">Mot de passe actuel</label>
                            <input type="password" id="current-password" name="current-password" placeholder="Mot de passe actuel" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new-password">Nouveau mot de passe</label>
                            <input type="password" id="new-password" name="new-password" placeholder="Nouveau mot de passe" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirmer le mot de passe</label>
                            <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirmer le mot de passe" />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="save-button">Enregistrer les modifications</button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default SettingsPage;
