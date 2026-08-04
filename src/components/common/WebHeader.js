import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { API_URL, STORAGE } from '../../utils/auth'; 
import imgTest from '../../assets/img/defualt_img.webp';

import '../../assets/css/slider.css';
import '../../assets/css/web_header.css';

import BackgroundHeadSection from './BackgroundHeadSection';

const fetchServices = async () => {
    const res = await fetch(`${API_URL}/services?list_id=4`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};

export default function WebHeader() {

    const { data: responseData, isLoading } = useQuery({
        queryKey: ['serviceSuggestion'],
        queryFn: fetchServices,
        staleTime: 5 * 60 * 1000,
    });

    const servicSugs = Array.isArray(responseData) 
        ? responseData 
        : (responseData?.data && Array.isArray(responseData.data)) 
            ? responseData.data 
            : [];

    return (
        <div className="uh09">
            <div className="uh09-box df-c">
                {/* row text */}
                <div className="row">
                    <div className="rbox">
                        <blockquote>
                            <h2 className="web">
                                បង្កើតដំណោះស្រាយប្រកបដោយភាពច្នៃប្រឌិត និងមានប្រសិទ្ធភាព គេហទំព័រនិងទូរស័ព្ទ។
                            </h2>
                            <p>រកសេវាកម្មល្អៗបាននៅទីនេះ! រាល់ការគាំទ្ររបស់បងៗ គឺជាកម្លាំងចិត្តឱ្យ ខ្ញុំបន្តស្វែងរកអ្វីដែលថ្មី និងឥតគិតថ្លៃមកចែករំលែកបន្តទៀត។</p>
                            <div className="action df-l">
                                <a href="/services" className="btn">ស្វែងរកសេវ៉ាកម្ម</a>
                                <a href="http://facebook.com/vensoeng" className="btn">ទំនាក់ទំនង</a>
                            </div>
                        </blockquote>
                        <div className="txt">Waiting for work!</div>
                    </div>
                </div>

                {/* row service */}
                <div className="row">
                    <div className="rbox">
                        <div className="rbh df-c">
                            <p>+service suggestion+</p>
                        </div>
                        <div className="data-side">
                            <div className="datasbox">
                                {isLoading ? (
                                    <div className="wbsl-load-an"></div>
                                ) : servicSugs.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                                        មិនមានទិន្នន័យដែលត្រូវទាញមក។
                                    </div>
                                ) : (
                                    <Slider services={servicSugs} />
                                )}
                            </div>
                        </div>
                        <div className="rbh">
                            <p>service description</p>
                        </div>
                    </div>
                </div>
            </div>
            <BackgroundHeadSection />
        </div>
    );
}

function Slider({ services = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef(null);

    // Filter strictly for the `img` field from each item
    const images = React.useMemo(() => {
        return services.map((item) => (item.img && typeof item.img === 'string' && item.img.trim() !== '') ? item.img : imgTest);
    }, [services]);

    const resetTimeout = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    const goToSlide = useCallback((index) => {
        setCurrentIndex(index);
    }, []);

    const nextSlide = useCallback(() => {
        if (images.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, [images.length]);

    const prevSlide = useCallback(() => {
        if (images.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        if (images.length <= 1) return;

        resetTimeout();
        timeoutRef.current = setTimeout(nextSlide, 4000);

        return () => {
            resetTimeout();
        };
    }, [currentIndex, images.length, nextSlide, resetTimeout]);

    if (!images || images.length === 0) return null;

    return (
        <div className="wbsh-slide">
            <div className="wbshs-box">
                <blockquote>
                    <div className="text">
                        <p>{services[currentIndex]?.title_kh || services[currentIndex]?.title}</p>
                    </div>
                    <div className="sub">
                       <p>{services[currentIndex]?.description_kh || services[currentIndex]?.description}</p>
                    </div>
                </blockquote>

                {/* Image Track */}
                <div className="list-img">
                    <div 
                        className="li-box" 
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {images.map((url, index) => (
                            <img 
                                key={index} 
                                className="img-co" 
                                src={API_URL + STORAGE + url } 
                                alt={`slide-${index}`} 
                                loading="lazy"
                                onError={(e) => { e.target.src = imgTest; }}
                            />
                        ))}
                    </div>
                </div>

                {/* Controls */}
                {images.length > 1 && (
                    <>
                        <button className="slider-nav-btn prev" onClick={prevSlide} aria-label="Previous Slide">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M15 19.92L8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08" stroke="#FF8A65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>

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
                    </>
                )}
            </div>
        </div>
    );
}