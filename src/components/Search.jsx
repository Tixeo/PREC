import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

function Search() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const fetchProducts = async (searchQuery) => {
        setLoading(true);
        try {
            const productsRef = collection(db, 'Articles');
            const normalizedQuery = searchQuery.trim().toLowerCase();
            
            const querySnapshot = await getDocs(productsRef);
            const articles = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            const filteredProducts = articles.filter(product => {
                const title = product.title.toLowerCase();
                return title.includes(normalizedQuery);
            });

            setProducts(filteredProducts);
        } catch (error) {
            console.error("Erreur lors de la récupération des articles : ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('query');
        if (query) {
            fetchProducts(query);
        }
    }, [location.search]);

    return (
        <section className="products">
            {loading && <div className="loading-spinner">Chargement...</div>}
            {!loading && products.length === 0 && <div className="no-results">Aucun résultat trouvé</div>}
            {products.map((product) => (
                <a key={product.id} href={`/products/${product.id}`}>
                    <article className="product">
                        {product.images && product.images.length > 0 && (
                            <img src={product.images[0]} alt={product.title} />
                        )}
                        <h3>{product.title}</h3>
                        <p className="product-text">{product.description}</p>
                    </article>
                </a>
            ))}
        </section>
    );
}

export default Search;
