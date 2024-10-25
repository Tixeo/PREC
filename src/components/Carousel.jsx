import React, { useState, useEffect } from 'react';
import img1 from '../assets/images/1.jpg';
import img2 from '../assets/images/2.jpg';

function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [img1, img2];

    const moveToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

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
