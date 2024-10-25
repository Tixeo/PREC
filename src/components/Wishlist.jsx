import React from 'react';
import placeholder from '../assets/images/placeholder.png';

function Wishlist() {
    const items = [
        { id: 1, name: 'Article 1', description: 'Description courte de l\'article 1', img: placeholder },
        { id: 2, name: 'Article 2', description: 'Description courte de l\'article 2', img: placeholder },
        { id: 3, name: 'Article 3', description: 'Description courte de l\'article 3', img: placeholder }
    ];

    const handleDetailClick = (articleName) => {
        alert(`Redirection vers la page de détail de l'article : ${articleName}`);
        // Redirection logic can be added here, like using React Router
    };

    return (
        <main>
            <h1>Ma Liste d'Envies</h1>
            <div className="wishlist">
                {items.map(item => (
                    <div className="wishlist-item" key={item.id}>
                        <img src={item.img} alt={item.name} />
                        <div className="wishlist-item-info">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <button onClick={() => handleDetailClick(item.name)}>Voir le détail</button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Wishlist;
