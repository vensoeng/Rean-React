import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
// import testImgStory from '../../assets/img/test_story_img.jpg';
import { API_URL, STORAGE } from '../../utils/auth';
import { NavLink } from 'react-router-dom';

export default function StoryPage({blog = {} , index = 0, newStory = false}) {
    const { t } = useTranslation();
    const [isFullyLoaded, setIsFullyLoaded] = useState(false);
    const imageRef = useRef(null);
    const imageUrl = API_URL + STORAGE + blog.img;

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
                console.warn(`Image failed to load for blog: ${blog.title}`);
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
    }, [imageUrl, blog.title]);
    
    // check privait blog 
    if(Number(blog.status) !== 1 ){
        return;
    }

    return (
        <li style={{ "--bg-img": `url(${API_URL + STORAGE + blog.img})` }}>

            {newStory ? <div className="txtTop-story btn">{t('homePage.blog.latest')}</div> : ''}
            
            <NavLink to={`/storys/detail/${blog.id}`} className="image">
                {!isFullyLoaded && (
                        <div className="img-loader-placeholder">
                            <div className="spinner"></div>
                            <span style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>{t('homePage.service.loading')}...</span>
                        </div>
                )}
                <img 
                    ref={imageRef}
                    className="img-c" 
                    src={imageUrl} 
                    alt={blog.title || "Story image"} 
                    style={{ 
                        opacity: isFullyLoaded ? 1 : 0, 
                        transition: 'opacity 0.4s ease-in-out',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </NavLink>
            <NavLink to={`/storys/detail/${blog.id}`} className="text text-main">
                <div className="title df-s">
                    <h2>{blog.title}</h2>
                    <span></span>
                </div>
                {/* <div className="sub">
                    <blockquote>
                        <p>ការរស់នៅក្នុងទំនាក់ទំនងមួយដែលមានតែអ្នកជាអ្នកដែលព្យាយាម លះបង់ ឬចូលចិត្តទទួលកំហុស មិនថានៅក្នុងទំនាក់ទំនងស្នេហា មិត្តភាព</p>
                    </blockquote>
                </div> */}
            </NavLink>
            <div className="detail">
                <div className="list df-l">
                    <strong>{t('homePage.blog.articles')}:</strong>
                    <div className="text df-l">
                        {blog.main_hastag && blog.main_hastag.split(/\s+/).filter(Boolean).map((tag, i) => (
                            <div className='btn' key={i}>
                                <p>{tag}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="list df-l">
                    <strong>{t('homePage.blog.tags')}:</strong>
                    <div className="text df-l">
                        {blog.hastag && blog.hastag.split(/\s+/).filter(Boolean).map((tag, i) => (
                            <div className='btn' key={i}>
                                <p>{tag}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </li>
    );
}
