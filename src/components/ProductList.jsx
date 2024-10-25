import React from 'react';
import img1 from '../assets/images/1.jpg';
import img2 from '../assets/images/2.jpg';

function ProductList() {
    const products = [
        { id: 1, name: 'Article 1', description: 'Description de l\'article 1', img: img1, url: 'article1' },
        { id: 2, name: 'Article 2', description: 'Description de l\'article 2', img: img2, url: 'article2' }
    ];

    return (
        <section className="products">
            {products.map((product) => (
                <a href={product.url} key={product.id}>
                    <article className="product">
                        <img src={product.img} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                    </article>
                </a>
            ))}
        </section>
    );
}

export default ProductList;
