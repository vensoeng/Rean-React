import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'iconsax-reactjs';
import QRCode from "react-qr-code";

import {
    FaFacebookF,
    FaTelegramPlane,
    FaLinkedinIn,
    FaWhatsapp,
    FaTimes
} from "react-icons/fa";

export default function NavBar({ 
    text, 
    shareLink = 'http://vensoeng.vercel.app', 
    linkBack = '/' 
}) {
    const { t } = useTranslation();
    const displayText = text || t('homePage.services.more');
    const navigate = useNavigate();
    
    const [copyText, setCopyText] = useState(t('blogPage.copy'));
    const [showShare, setShowShare] = useState(false);
    const shareUrl = shareLink;
    
    const copyLink = async () => {
        try {
            setCopyText(t('blogPage.copying'));
            await navigator.clipboard.writeText(shareUrl);
            setCopyText(t('blogPage.copied'));
            setTimeout(() => {
                setCopyText(t('blogPage.copy'));
            }, 2000);
        } catch (err) {
            console.error("Error copying link:", err);
            setCopyText('បរាជ័យ!');
            setTimeout(() => {
                setCopyText(t('blogPage.copy'));
            }, 2000);
        }
    };

    const handleShare = () => {
        setShowShare(true);
    };

    const handleBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate(linkBack);
        }
    };

    return (
        <>
            <nav className="wba-n">
                <div className="wban-box df-s">
                    <button 
                        type="button" 
                        className="btn-home row btn ibtn"
                        onClick={handleBack}
                    >
                        <ArrowLeft />
                    </button>
                    <div className="row">
                        <h2>{displayText}</h2>
                    </div>
                    <div className="row df-l btn-style">
                        <button className="btn btn-share" onClick={handleShare}>
                            {t('designsPage.hero.share')}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16"
                            height="16" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                            <path
                                d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3">
                            </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {showShare && (
                <div className="share-overlay">
                    <div className="share-modal">
                        <button
                            className="share-close btn icon-ra icon-sm"
                            onClick={() => setShowShare(false)}
                        >
                            <FaTimes />
                        </button>
                        <h3>{t('designsPage.hero.share')}</h3>
                        <div className="share-qr">
                            <QRCode
                                value={shareUrl}
                                size={160}
                            />
                        </div>
                        <div className="share-socials">
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaFacebookF />
                                <span>Facebook</span>
                            </a>
                            <a
                                href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaTelegramPlane />
                                <span>Telegram</span>
                            </a>
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaLinkedinIn />
                                <span>LinkedIn</span>
                            </a>
                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaWhatsapp />
                                <span>WhatsApp</span>
                            </a>
                        </div>
                        <div className="share-copy">
                            <input
                                value={shareUrl}
                                readOnly
                            />
                            <button 
                                onClick={copyLink}
                                style={{
                                    backgroundColor: copyText === t('blogPage.copied') ? 'var(--sg-color-brand)' : '',
                                    color: copyText === t('blogPage.copied') ? '#ffffff' : '',
                                    transition: 'all 0.2s ease-in-out'
                                }}
                            >
                                {copyText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}