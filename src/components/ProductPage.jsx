import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { doc, getDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import ImageZoom from './ImageZoom';

const ProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [currentImage, setCurrentImage] = useState('');
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({ title: '', description: '', size: [], availableOnline: false });

    useEffect(() => {
        const fetchProduct = async () => {
            const productDoc = await getDoc(doc(db, 'Articles', productId));
            if (productDoc.exists()) {
                const productData = productDoc.data();
                setProduct(productData);
                setCurrentImage(productData.images[0]);
                setUpdatedProduct({ ...productData });

                const auth = getAuth();
                const user = auth.currentUser;
                if (user) {
                    const userDoc = await getDoc(doc(db, 'Users', user.uid)); 
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setIsAdmin(userData.admin || false);
                        
                        const isProductInChoiceList = userData.choiceList?.some(item => item.id === productId);
                        setIsWishlisted(isProductInChoiceList);
                    }
                }
            } else {
                console.error('Aucun document trouvé pour cet ID');
            }
        };
        fetchProduct();
    }, [productId]);

    const handleThumbnailClick = (image) => {
        setCurrentImage(image);
    };

    const handleWishlistClick = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
    
        if (!user) {
            alert("Veuillez vous connecter pour ajouter des articles à votre liste.");
            return;
        }
    
        const userRef = doc(db, 'Users', user.uid);
        const timestamp = new Date().toISOString();
    
        try {
            const userDoc = await getDoc(userRef);
            const currentChoiceList = userDoc.exists() ? userDoc.data().choiceList : [];
    
            const isProductInList = currentChoiceList.some(item => item.id === productId);
    
            if (isProductInList) {
                await updateDoc(userRef, {
                    choiceList: arrayRemove(currentChoiceList.find(item => item.id === productId))
                });
                alert('Article supprimé de votre liste !');
                setIsWishlisted(false);
            } else {
                await updateDoc(userRef, {
                    choiceList: arrayUnion({
                        id: productId,
                        dateAdded: timestamp 
                    })
                });
                alert('Article ajouté à votre liste !');
                setIsWishlisted(true);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout ou de la suppression à la liste :", error);
        }
    };    
    

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setUpdatedProduct((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            setUpdatedProduct((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleUpdate = async () => {
        if (!isAdmin) {
            alert('Vous n\'avez pas l\'autorisation de modifier ce produit.');
            return;
        }
        if (window.confirm('Êtes-vous sûr de vouloir modifier ce produit ?')) {
            try {
                await updateDoc(doc(db, 'Articles', productId), updatedProduct);
                alert('Produit mis à jour avec succès !');
                setIsEditing(false);
                window.location.pathname = "/";
            } catch (error) {
                console.error('Erreur lors de la mise à jour du produit :', error);
            }
        }
    };

    const handleDelete = async () => {
        if (!isAdmin) {
            alert('Vous n\'avez pas l\'autorisation de supprimer ce produit.');
            return;
        }
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            try {
                await deleteDoc(doc(db, 'Articles', productId));
                alert('Produit supprimé avec succès !');
                window.location.pathname = "/";
            } catch (error) {
                console.error('Erreur lors de la suppression du produit :', error);
            }
        }
    };

    if (!product) {
        return <div>Chargement...</div>;
    }

    return (
        <main className='maneProduct'>
            <section className="gallery">
                <div className="thumbnails">
                    {product.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Miniature ${index + 1}`}
                            className="thumbnail"
                            onClick={() => handleThumbnailClick(image)}
                        />
                    ))}
                </div>
                <ImageZoom src={currentImage} alt="Image principale" />
            </section>
            <section className="product-info">
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <div className="size-selector">
                    <h3>Tailles disponibles</h3>
                    {product.size.map((size) => (
                        <label key={size}>
                            <button 
                                className={`size-button ${updatedProduct.size.includes(size) ? 'selected' : ''}`} 
                                onClick={() => {
                                    const newSize = size;
                                    setUpdatedProduct(prev => {
                                        const newSizes = prev.size.includes(newSize)
                                            ? prev.size.filter(s => s !== newSize) 
                                            : [...prev.size, newSize];
                                        return { ...prev, size: newSizes };
                                    });
                                }}
                            >
                                {size}
                            </button>
                        </label>
                    ))}
                </div>

                <p className="availability">{product.availableOnline ? "Disponible en ligne" : "Uniquement disponible en magasin"}</p>
                <button className="wishlist-button" onClick={handleWishlistClick}>
                    <span className="star" style={{ color: isWishlisted ? 'gold' : 'black' }}>☆</span> {isWishlisted ? "Ajouté" : "Ajouter à Ma liste"}
                </button>

                {isAdmin && (
                    <div className="admin-buttons">
                        <button onClick={handleEdit} className="admin-button edit-button">Modifier</button>
                        <button onClick={handleDelete} className="admin-button delete-button">Supprimer</button>
                    </div>
                )}

                {isEditing && (
                    <div className="edit-form">
                        <h3>Modifier le produit</h3>
                        <label>
                            Titre:
                            <input 
                                type="text" 
                                name="title" 
                                value={updatedProduct.title} 
                                onChange={handleInputChange} 
                            />
                        </label>
                        <label>
                            Description:
                            <textarea 
                                name="description" 
                                value={updatedProduct.description} 
                                onChange={handleInputChange} 
                            />
                        </label>
                        <label>
                            Disponible en magasin:
                            <input 
                                type="checkbox" 
                                name="availableOnline" 
                                checked={updatedProduct.availableOnline} 
                                onChange={handleInputChange} 
                            />
                        </label>
                        <button onClick={handleUpdate}>Enregistrer les modifications</button>
                    </div>
                )}
            </section>
        </main>
    );
};

export default ProductPage;
