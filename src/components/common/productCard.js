import { useState, useEffect, useRef } from 'react';
import { API_URL, STORAGE } from '../../utils/auth';
import Logo from '../../assets/img/logo192.png';

import { Eye } from 'iconsax-reactjs';
///main import item
export default function ProductCard({ product = {}, index = 0}) {
    const [isFullyLoaded, setIsFullyLoaded] = useState(false);
    const imageRef = useRef(null);
    
    const imageUrl = product?.img ? `${API_URL}${STORAGE}${product.img}` : Logo;

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
    const isVisible = product?.status === true || product?.status === 'true' || product?.status === '1' || Number(product?.status) === 1;
    if (!product || Object.keys(product).length === 0 || !isVisible) {
        return null; 
    }

    return (
        <li className="list">
            <div className="card-box">
                {/* */}
                <div className="cb-h">
                    {Number(product.pesent) !== 0 ? (
                        <div className="btn c-view">
                            បញ្ចុះ
                            <span>{product.pesent}%</span>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <div className="cbh-box">
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
                            alt={product.title || "design image"} 
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
                {/* */}
                <div className="cb-c">
                    <div className="cb-box">
                        <blockquote>
                            <h2>{product.name}</h2>
                            <blockquote>
                                <p>{product.des}</p>
                            </blockquote>
                        </blockquote>
                        <div className="df-l">
                            <Eye/>
                            <p>{product.view_count} ចំនួនមើល</p>
                        </div>
                    </div>
                </div>
                {/* */}
                <div className="cb-f">
                    <div className="cbf-box df-s">
                        <div className="price">
                            <p>Price</p>
                            <h2>${Number(product.price).toFixed(2)}</h2>
                        </div>
                        <div className="faction">
                            <div className="btn">
                                <span>មើលព័ត៌មាន</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
