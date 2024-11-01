import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { doSignOut } from '../firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../styles/style.css";
import "../styles/settings.css";

const SettingsPage = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({ name: "", email: "", photoUrl: "" });
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const storage = getStorage();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userDoc = await getDoc(doc(db, "Users", currentUser.uid));
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                }
            } else {
                navigate("/");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                document.getElementById("profile-picture").src = reader.result;
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSignOut = async () => {
        try {
            await doSignOut();
            setIsAdmin(false);
            navigate('/');
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    const resizeImage = (file) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const size = 300;
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext("2d");

                const sourceX = (img.width - img.height) / 2 < 0 ? 0 : (img.width - img.height) / 2; 
                const sourceY = (img.height - img.width) / 2 < 0 ? 0 : (img.height - img.width) / 2;
                const dimension = Math.min(img.width, img.height);

                ctx.drawImage(img, sourceX, sourceY, dimension, dimension, 0, 0, size, size);
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, "image/jpeg", 0.7);
            };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userRef = doc(db, "Users", user.uid);
        const updatedData = { ...userData };

        const newName = event.target.name.value.trim();

        if (file) {
            const resizedFile = await resizeImage(file);
            const storageRef = ref(storage, `profilePictures/${user.uid}`);
            await uploadBytes(storageRef, resizedFile);
            const photoUrl = await getDownloadURL(storageRef);
            updatedData.photoUrl = photoUrl;
        }

        if (newName) {
            updatedData.name = newName;
        }

        alert('Les modifications ont été enregistrées avec succès !');

        await setDoc(userRef, updatedData);
    };

    if (!user) {
        return null;
    }

    return (
        <>
            <main>
                <div className="settings-container">
                    <h2>Paramètres du compte</h2>

                    <div className="settings-profile">
                        <h3>Photo de profil</h3>
                        <div className="profile-picture-section">
                            <img id="profile-picture" src={userData.photoUrl} alt="Photo de profil" className="profile-picture" />
                            <div className="profile-upload">
                                <label htmlFor="profile-upload" className="upload-button">Changer la photo</label>
                                <input type="file" id="profile-upload" accept="image/*" hidden onChange={handleFileChange} />
                            </div>
                        </div>
                    </div>

                    <form className="settings-form" onSubmit={handleSubmit}>
                        <h3>Informations personnelles</h3>

                        <div className="form-group">
                            <label htmlFor="name">Nom complet</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder={userData.name || "Votre nom"}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Adresse e-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userData.email}
                                readOnly
                            />
                        </div>
                        

                        {/*<div className="form-group">
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
                        */}

                        <div className="form-actions">
                            <button type="submit" className="save-button">Enregistrer les modifications</button>
                        </div>
                    </form>
                    <button className="deco-button" onClick={handleSignOut}>Déconnexion</button>
                </div>
            </main>
        </>
    );
};

export default SettingsPage;
