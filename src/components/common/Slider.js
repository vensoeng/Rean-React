import React, { useState, useEffect, useRef } from 'react';
import '../../assets/css/slider.css';

export default function Slider({ images = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        if (images.length <= 1) return;

        resetTimeout();
        timeoutRef.current = setTimeout(nextSlide, 4000);

        return () => {
            resetTimeout();
        };
    }, [currentIndex, images.length]);

    if (!images || images.length === 0) return null;

    return (
        <div className="wbsh-slide">
            <div className="wbshs-box">
                {/* Image Track */}
                <div className="list-img">
                    <div 
                        className="li-box" 
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {images.map((url, index) => (
                            <img 
                                key={index} 
                                className="img-c" 
                                src={url} 
                                alt={`slide-${index}`} 
                                loading="lazy"
                            />
                        ))}
                    </div>
                </div>

                {/* Left (Prev) Button */}
                <button className="slider-nav-btn prev" onClick={prevSlide} aria-label="Previous Slide">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 19.92L8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08" stroke="#FF8A65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* Right (Next) Button */}
                <button className="slider-nav-btn next" onClick={nextSlide} aria-label="Next Slide">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M8.91 19.92l6.52-6.52c.77-.77.77-2.03 0-2.8L8.91 4.08" stroke="#FF8A65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* Pagination Dots */}
                <div className="sgination">
                    <div className="sg-box">
                        {images.map((_, index) => (
                            <div 
                                key={index}
                                className={`btn-dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}