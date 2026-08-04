import { useState, useEffect, useRef } from 'react';
import { API_URL, STORAGE } from '../../utils/auth';
import Logo from '../../assets/img/logo192.png';

///main import item
export default function DesignsCard({ designs = {}, index = 0, newStory = false }) {
    const [isFullyLoaded, setIsFullyLoaded] = useState(false);
    const imageRef = useRef(null);
    
    const imageUrl = designs?.img ? `${API_URL}${STORAGE}${designs.img}` : Logo;

    useEffect(() => {
        let isMounted = true;
        const img = imageRef.current;
        if (!img) return;

        const checkImageStatus = () => {
            if (img.complete && img.naturalWidth > 0) {
                if (isMounted) setIsFullyLoaded(true);
                return;
            }
            const handleLoad = () => { if (isMounted) setIsFullyLoaded(true); };
            const handleError = () => { if (isMounted) setIsFullyLoaded(true); };

            img.addEventListener('load', handleLoad, { once: true });
            img.addEventListener('error', handleError, { once: true });

            return () => {
                img.removeEventListener('load', handleLoad);
                img.removeEventListener('error', handleError);
            };
        };

        const cleanupListeners = checkImageStatus();
        return () => {
            isMounted = false;
            if (cleanupListeners) cleanupListeners();
        };
    }, [imageUrl]);
    
    // ពិនិត្យលក្ខខណ្ឌ status = "true" ពី Backend
    const isVisible = designs?.status === true || designs?.status === 'true' || designs?.status === '1' || Number(designs?.status) === 1;
    if (!designs || Object.keys(designs).length === 0 || !isVisible) {
        return null; 
    }

    return (
        <div className="d01i">
            <div className="d01i-box df-c">
                {/* <!-- this is row text  --> */}
                <div className="d01ir">
                    <div className="d01ir-box">
                        <div className="d01txt">
                            <h2>{designs.title}</h2>
                            <p>{designs.main_ti || designs.title || "គ្មានចំណងជើង"}</p>
                        </div>
                        <div className="d01-dt">
                            <div className="datec df-s">
                                <p>{designs.created_at}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 3h1a28.424 28.424 0 0 0 0 18H8M15 3a28.424 28.424 0 0 1 0 18" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16v-1a28.424 28.424 0 0 0 18 0v1M3 9a28.424 28.424 0 0 1 18 0" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </div>
                            <blockquote>
                                <p>{designs.des}</p>
                            </blockquote>
                            <div className="action df-l">
                                <div className="btn btn-style btn-more">
                                    <p>មើលបន្ថែម</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 3h9v9M21 3 3 21M6.6 6.6l10.8 10.8" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                </div>
                                <div className="btn btn-style btn-share">
                                    <p>ចែករំលែក</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16"><path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"></path></svg>
                                </div>
                            </div>
                            <div className="has">
                                <div className="hs-box df-l">
                                    {designs.tags && typeof designs.tags === 'string' && 
                                        designs.tags.split(/\s+/).filter(Boolean).map((tag, i) => (
                                            <div className="i btn">{tag}</div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- this is row image  --> */}
                <div className="d01ir">
                    <div className="d01ir-box">
                        <div className="d01img">
                            {!isFullyLoaded && (
                                <div className="img-loader-placeholder">
                                    <div className="spinner"></div>
                                    <span style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>កំពុងផ្ទុក...</span>
                                </div>
                            )}
                            <img 
                                ref={imageRef}
                                className="img-co" 
                                src={imageUrl} 
                                alt={designs.title || "design image"} 
                                style={{ 
                                    opacity: isFullyLoaded ? 1 : 0, 
                                    transition: 'opacity 0.4s ease-in-out',
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
