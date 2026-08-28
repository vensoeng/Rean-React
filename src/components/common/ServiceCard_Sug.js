import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function ServiceCard({ service, fallbackImg, apiUrl, storageUrl }) {
    const [isFullyLoaded, setIsFullyLoaded] = useState(false);

    const imageUrl = service.img ? `${apiUrl}${storageUrl}${service.img}` : fallbackImg;

    const navigate = useNavigate();
    const locate = () =>{
        navigate('/services/detail/' + service.id);
    }

    const { t, i18n } = useTranslation();

    return (
        <li>
            <div className="box">
                <blockquote>
                    <h2>{i18n.language === 'kh' ? service.title_kh :  service.title}</h2>
                    <p>
                        {i18n.language === 'kh' ? service.description_kh : service.description}
                    </p>
                </blockquote>
                <div className="svl-action">
                    <div className="svla-box df-c">
                        <a href={'/services/detail/' + service.id} className="btn btn-style">{t('homePage.services.more')}</a>
                        <a href={'/booking/service/' + service.id} className="btn btn-style">{t('homePage.services.discuss')}</a>
                    </div>
                </div>
            </div>

            {/* Image Wrapper Container */}
            <div className="l-img img-box"  
                onClick={() => locate()}
                style={!isFullyLoaded ? { position: 'relative', overflow: 'hidden', aspectRatio: '1 /1', } : { position: 'relative', overflow: 'hidden' } }  >
                {!isFullyLoaded && (
                    <div 
                        className="img-loader-placeholder" 
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            aspectRatio: 1 /1,
                            backgroundColor: '#f8fafc'
                        }}
                    >
                        <div className="spinner"></div>
                        <span style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
                            {t('homePage.services.loading')}
                        </span>
                    </div>
                )}
                
                <img
                    className="img-c"
                    src={imageUrl}
                    alt={service.title_kh || "service image"}
                    onLoad={() => setIsFullyLoaded(true)}
                    style={{
                        opacity: isFullyLoaded ? 1 : 0,
                        transition: 'opacity 0.4s ease-in-out',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </div>
        </li>
    );
}