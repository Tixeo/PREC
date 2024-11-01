import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const fetchLatestProducts = async () => {
            const productsCollection = collection(db, 'Articles');
            const q = query(productsCollection, orderBy('timestamp', 'desc'));
            const querySnapshot = await getDocs(q);
            const latestProducts = querySnapshot.docs.slice(0, 2).map(doc => doc.data());

            const images = latestProducts.map(product => product.images[0]);
            setSlides(images);
        };

        fetchLatestProducts();
    }, []);

    const moveToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    if (slides.length === 0) {
        return <div>Chargement des articles...</div>;
    }

    return (
        <section className="carousel-section">
            <div className="carousel">
                <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {slides.map((slide, index) => (
                        <div className="carousel-slide" key={index}>
                            <img src={slide} alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <button className="carousel-button prev" onClick={() => moveToSlide((currentSlide - 1 + slides.length) % slides.length)}>❮</button>
                <button className="carousel-button next" onClick={() => moveToSlide((currentSlide + 1) % slides.length)}>❯</button>
                <div className="carousel-dots">
                    {slides.map((_, index) => (
                        <button key={index} className={currentSlide === index ? 'active' : ''} onClick={() => moveToSlide(index)} aria-label={`Slide ${index + 1}`}></button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Carousel;
