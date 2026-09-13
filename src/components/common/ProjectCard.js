import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'iconsax-reactjs';
// import testImgStory from '../../assets/img/test_story_img.jpg';
import { API_URL, STORAGE } from '../../utils/auth';

export default function ProjectCard({item = {} , index = 0}) {
    const { t } = useTranslation();
    const [isFullyLoaded, setIsFullyLoaded] = useState(false);
    const imageRef = useRef(null);
    const imageUrl = API_URL + STORAGE + item.img;

    useEffect(() => {
        let isMounted = true;
        const img = imageRef.current;
        if (!img) return;

        const checkImageStatus = () => {

            if (img.complete && img.naturalWidth > 0) {
                if (isMounted) setIsFullyLoaded(true);
                return;
            }

            const handleLoad = () => {
                if (isMounted) setIsFullyLoaded(true);
            };

            const handleError = () => {
                console.warn(`Image failed to load for item: ${item.title}`);
                if (isMounted) setIsFullyLoaded(true);
            };

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
    }, [imageUrl, item.title]);


    return (
        <div className="wpj02-lt btn-style">
            <div className="wpj02-lt-bx">
                {/* <!-- this is image --> */}
                <a href={item.link || "#"} target="_blank" rel="noopener noreferrer" className="data-img btn-style">
                    <div className={`data-start btn ${item.status === 'true' ? 'active' : ''}`}>
                        {item.status === 'true' ? 'Live' : 'Draft'}
                    </div>
                    {!isFullyLoaded && (
                        <div className="img-loader-placeholder">
                            <div className="spinner"></div>
                            <span style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>{t('homePage.services.loading')}...</span>
                        </div>
                    )}
                    <img
                        ref={imageRef}
                        className="img-c"
                        src={imageUrl}
                        alt={item.title || "Story image"}
                        style={{
                            opacity: isFullyLoaded ? 1 : 0,
                            transition: 'opacity 0.4s ease-in-out',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </a>
                <div className="data-text">
                    <a href={item.link || "#"} target="_blank" rel="noopener noreferrer" className="title">
                        <h3>{item.title || "Default Title"}</h3>
                    </a>
                    <a href={item.link || "#"} target="_blank" rel="noopener noreferrer" className="sub">
                        <p>
                            {item.des || "Default description"}
                        </p>
                    </a>
                    <div className="tags">
                        {item.tags && item.tags.split(/\s+/).filter(Boolean).map((tag, i) => (
                            <span className='btn' key={i}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="data-action df-s">
                    <div className="data-date df-l">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M8 2v3M16 2v3M3.5 9.09h17M19.21 15.77l-3.54 3.54c-.14.14-.27.4-.3.59l-.19 1.35c-.07.49.27.83.76.76l1.35-.19c.19-.03.46-.16.59-.3l3.54-3.54c.61-.61.9-1.32 0-2.22-.89-.89-1.6-.6-2.21.01Z" stroke="#FF8A65" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.7 16.28c.3 1.08 1.14 1.92 2.22 2.22M12 22H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5V12" stroke="#FF8A65" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.995 13.7h.01M8.294 13.7h.01M8.294 16.7h.01" stroke="#FF8A65" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        <p>{item.created_at || "Default date"}</p>
                    </div>
                    <a href={item.link || "#"} target='_blank' rel="noopener noreferrer" className="btn btn-style">
                        <span>{t('projectPage.demo')}</span>
                        <ArrowRight />
                    </a>
                </div>
            </div>
        </div>
    );
}
