import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import placeholder from '../assets/images/placeholder.png';

const Wishlist = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchWishlistItems = async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                const userRef = doc(db, 'Users', user.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const choiceList = userDoc.data().choiceList || [];

                    const articles = await Promise.all(choiceList.map(async (item) => {
                        const articleRef = doc(db, 'Articles', item.id);
                        const articleDoc = await getDoc(articleRef);
                        if (articleDoc.exists()) {
                            const articleData = articleDoc.data();
                            return {
                                id: articleData.id || item.id,
                                name: articleData.title,
                                description: articleData.description,
                                img: articleData.images[0] || placeholder
                            };
                        }
                        return null;
                    }));

                    setItems(articles.filter(item => item !== null));
                } else {
                    console.error("Aucun utilisateur trouvé !");
                }
            }
        };

        fetchWishlistItems();
    }, []);

    const handleDetailClick = (item) => {
        window.location.href = `/products/${item.id}`;
    };

    return (
        <main>
            <h1>Ma Liste d'Envies</h1>
            <div className="wishlist">
                {items.length > 0 ? (
                    items.map(item => (
                        <div className="wishlist-item" key={item.id}>
                            <img src={item.img} alt={item.name} />
                            <div className="wishlist-item-info">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <button onClick={() => handleDetailClick(item)}>Voir le détail</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucun article dans votre liste d'envies.</p>
                )}
            </div>
        </main>
    );
};

export default Wishlist;
