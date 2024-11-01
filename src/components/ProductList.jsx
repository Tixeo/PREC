import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const productsRef = collection(db, 'Articles');
            const productsQuery = lastVisible
                ? query(productsRef, orderBy('timestamp', 'desc'), startAfter(lastVisible), limit(10))
                : query(productsRef, orderBy('timestamp', 'desc'), limit(10));
                
            const querySnapshot = await getDocs(productsQuery);

            if (!querySnapshot.empty) {
                const articles = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setProducts((prevProducts) => {
                    const newProducts = articles.filter(
                        (newArticle) => !prevProducts.some((existingArticle) => existingArticle.id === newArticle.id)
                    );
                    return [...prevProducts, ...newProducts];
                });

                setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
            } else {
                setAllLoaded(true);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des articles : ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
                if (!loading && !allLoaded) {
                    fetchProducts();
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, allLoaded]);

    return (
        <section className="products">
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
            {loading && <div className="loading-spinner">Chargement...</div>}
            {allLoaded && <div className="end-message">Tous les articles sont chargés</div>}
        </section>
    );
}

export default ProductList;
