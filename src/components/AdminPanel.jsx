import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../styles/style.css";
import "../styles/settings.css";
import { GoogleGenerativeAI } from "https://cdn.skypack.dev/@google/generative-ai";

const AdminPanel = () => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [size, setSize] = useState([]);
    const [availableOnline, setAvailableOnline] = useState(false);
    const [filter, setFilter] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const storage = getStorage();

    const filterOptions = ["bonnet","écharpe","pantalon","chaussette","pull","tee-shirt","chemise","veste","blouson","manteau","doudoune","gants","chapeau","casquette","bermuda","short","jupe","robe","legging","pyjama","sous-vêtement","maillot de bain","débardeur","cardigan","gilet","tailleur","costume","cravate","ceinture","bottes","baskets","chaussures","mocassins","sandales","tongs",];
    const genAI = new GoogleGenerativeAI("AIzaSyCAJCjCZVkAuB_FfZo6U22OBT509_OT0yE");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userDoc = await getDoc(doc(db, "Users", currentUser.uid));
                if (userDoc.exists() && userDoc.data().admin) {
                    setUser(currentUser);
                    setIsAdmin(true);
                } else {
                    navigate("/");
                }
            } else {
                navigate("/");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleImageChange = async (event) => {
        const selectedFiles = Array.from(event.target.files);
        const totalImages = images.length + selectedFiles.length;

        if (totalImages <= 10) {
            setImages((prevImages) => [...prevImages, ...selectedFiles]);

            const file = selectedFiles[0];
            if (file) {
                setLoading(true);
                const base64String = await fileToBase64(file);
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

                const result = await model.generateContent([
                    {
                        inlineData: {
                            data: base64String,
                            mimeType: file.type
                        }
                    },
                    {text: "Analyse cette image et fournis les informations suivantes, séparées par un retour à la ligne, sans commentaires ni titres pour chaque partie :\n\n1. Un titre très court décrivant uniquement le vêtement.\n2. Une description courte et précise du vêtement, sans référence à la personne qui pourrait le porter ni les accessoire ajouté.\n3. Un type de vêtement choisi uniquement parmi la liste suivante : [\"bonnet\", \"écharpe\", \"pantalon\", \"chaussette\", \"pull\", \"tee-shirt\", \"chemise\", \"veste\", \"blouson\", \"manteau\", \"doudoune\", \"gants\", \"chapeau\", \"casquette\", \"bermuda\", \"short\", \"jupe\", \"robe\", \"legging\", \"pyjama\", \"sous-vêtement\", \"maillot de bain\", \"débardeur\", \"cardigan\", \"gilet\", \"tailleur\", \"costume\", \"cravate\", \"ceinture\", \"bottes\", \"baskets\", \"chaussures\", \"mocassins\", \"sandales\", \"tongs\"].\n\nVoici un exemple de réponse :\nPantalon Noir\nPantalon bleu marine à fines rayures.\npantalon"}                      
                ]);

                const processedText = result.response.text();
                const titleAndDescription = processedText.split('\n');

                const cleanTitle = titleAndDescription[0]?.trim() || "";
                const cleanDescription = titleAndDescription[1]?.trim() || "";
                const cleanFilter = titleAndDescription[2]?.trim().toLowerCase() || "";

                setTitle(cleanTitle);
                setDescription(cleanDescription);
                setFilter(cleanFilter);
                setLoading(false);
            }
        } else {
            alert("Vous pouvez ajouter jusqu'à 10 images au maximum.");
        }
    };

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
        });
    };

    const removeImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSizeChange = (event) => {
        const value = event.target.value;
        setSize((prev) =>
            prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (title && description && images.length > 0) {
            const imageUrls = await Promise.all(images.map(uploadImage));
            const articleData = {
                title,
                description,
                images: imageUrls,
                size,
                availableOnline,
                filter,
                timestamp: new Date()
            };

            try {
                await setDoc(doc(db, "Articles", `${Date.now()}`), articleData);
                alert("Article créé avec succès!");
                setTitle("");
                setDescription("");
                setImages([]);
                setSize([]);
                setAvailableOnline(false);
                setFilter(null);
            } catch (error) {
                console.error("Erreur lors de la création de l'article: ", error);
                alert("Erreur lors de la création de l'article.");
            }
        } else {
            alert("Veuillez remplir tous les champs requis (titre, description et au moins une image).");
        }
    };

    const uploadImage = async (image) => {
        const storageRef = ref(storage, `articleImages/${image.name}`);
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL; 
    };

    if (!isAdmin) {
        return null;
    }

    return (
        <main>
            <div className="settings-container">
                <h2>Panneau d'administration</h2>
                {loading && <div className="loading-spinner">Chargement...</div>}
                <form className="settings-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Titre</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Titre de l'article"
                            required
                            className="textarea-style"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description de l'article"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image-upload">Importer des images (max 10)</label>
                        <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            onChange={handleImageChange}
                            disabled={images.length >= 10}
                            multiple
                        />
                        <div className="image-preview">
                            {images.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`Prévisualisation ${index + 1}`}
                                        className="preview-image"
                                    />
                                    <button type="button" onClick={() => removeImage(index)} className="remove-button">
                                        ✖
                                    </button>
                                </div>
                            ))}
                        </div>
                        <p>{images.length} / 10 images ajoutées</p>
                    </div>

                    <div className="form-group">
                        <label>Taille</label>
                        <div className="checkbox-group">
                            {["S", "M", "L", "XL"].map((sizeOption) => (
                                <label key={sizeOption} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        id={sizeOption}
                                        value={sizeOption}
                                        checked={size.includes(sizeOption)}
                                        onChange={handleSizeChange}
                                    />
                                    <span className="checkbox-custom">
                                        <span className="checkbox-checkmark">✓</span>
                                    </span>
                                    <span>{sizeOption}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Champ de sélection de filtre, optionnel */}
                    <div className="form-group">
                        <label htmlFor="filter">Filtre</label>
                        <select
                            id="filter"
                            value={filter || ""}
                            onChange={(e) => setFilter(e.target.value || null)} // Null si aucune option sélectionnée
                        >
                            <option value="">Aucun filtre</option>
                            {filterOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group" style={{ display: 'none' }}>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={availableOnline}
                                onChange={() => setAvailableOnline(!availableOnline)}
                            />
                            <span className="checkbox-custom">
                                <span className="checkbox-checkmark">✓</span>
                            </span>
                            <span>Disponible en ligne</span>
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="save-button">Créer l'article</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default AdminPanel;
