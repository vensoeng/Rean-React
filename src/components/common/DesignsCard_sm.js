import { useState, useEffect, useRef } from 'react';
import { API_URL, STORAGE } from '../../utils/auth';
import Logo from '../../assets/img/logo192.png';


function SliderImageItem({ src, alt }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="dsls-item">
            {!isLoaded && (
                <div className="img-loader-placeholder" style={{ height: '100%', minHeight: '80px' }}>
                    <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
                </div>
            )}
            <img 
                className="img-c" 
                src={src} 
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                onError={() => setIsLoaded(true)} 
                style={{ 
                    opacity: isLoaded ? 1 : 0, 
                    transition: 'opacity 0.3s ease-in-out',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            />
        </div>
    );
}
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
        <li>
            <div className="dsl-box">
                {/* */}
                <div className="dsl-h df-l">
                    <div className="dslh-pr icon icon-sm">
                        <img src={Logo} alt='Logo' className='img-c' loading='lazy' />
                    </div>
                    <div className="dslh-txt">
                        <h2>{designs.main_ti || designs.title || "គ្មានចំណងជើង"} <span>{designs.created_at}</span></h2>
                        <p>ទើបតែទំពើមាស</p> 
                    </div>
                </div>

                {/* */}
                <div className="dsl-c">
                    <div className="dslc-box">
                        <div className="img-box">
                            {!isFullyLoaded && (
                                <div className="img-loader-placeholder">
                                    <div className="spinner"></div>
                                    <span style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>កំពុងផ្ទុក...</span>
                                </div>
                            )}
                            <img 
                                ref={imageRef}
                                className="img-c" 
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
                        <blockquote className="txt-box">
                            <h3>{designs.title}</h3>
                            <p>{designs.des}</p>
                        </blockquote>
                        <div className="dslc-hs">
                            {designs.tags && typeof designs.tags === 'string' && 
                                designs.tags.split(/\s+/).filter(Boolean).map((tag, i) => (
                                    <span key={i} className="btn">#{tag}</span>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* */}
                {designs.list_img && typeof designs.list_img === 'string' && designs.list_img.trim() !== "" && (
                    <div className="dsl-s">
                        <div className="dsls-box df-l scroll-x">
                            {designs.list_img
                                .split(',')
                                .map(img => img.trim())
                                .filter(Boolean)
                                .map((imgUrl, i) => {
                                    // ⚠️ ពិនិត្យត្រង់ចំណុចនេះ៖ ផ្អែកលើ JSON មុនរបស់អ្នក ទិន្នន័យពី Backend គឺមានជាប់ "http://localhost:5000/..." រួចស្រេចហើយ
                                    // ដូច្នេះយើងមិនត្រូវបូក API_URL បន្ថែមទៀតទេ បើមិនដូច្នោះទេ URL នឹងត្រួតគ្នា (Double URL)
                                    const finalSrc = imgUrl.startsWith('http') ? imgUrl : `${API_URL}${imgUrl}`;

                                    return (
                                        <SliderImageItem 
                                            key={i} 
                                            src={finalSrc} 
                                            alt={`slider item ${i + 1}`} 
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                )}

                {/* */}
                <div className="dsl-f">
                    <div className="dslf-box df-s">
                        <div className="dslfb-row df-l">
                            <div className="btn">{designs.view_count || 0} ចំនួនមើល</div>
                            <div className="btn">{designs.share_count || 0} ចែករំលែក</div>
                        </div>
                        <div className="dslfb-row">
                            <div className="btn">
                                ចែករំលែក
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M19.29 9.17 7.7 3.07C4.95 1.62 1.96 4.55 3.35 7.33l1.62 3.24c.45.9.45 1.96 0 2.86l-1.62 3.24c-1.39 2.78 1.6 5.7 4.35 4.26l11.59-6.1c2.28-1.2 2.28-4.46 0-5.66Z" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
