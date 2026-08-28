import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { API_URL, STORAGE } from '../utils/auth';

import Footer from '../components/layout/footer';
import WebLoader from '../components/common/WebLoader';
import NavBar from '../components/common/Navbar';
import ListImgDesigns from '../components/common/ListImgDesigns';
import NotFoundPage from './404';
import DesignsCard from '../components/common/DesignsCard_sm'; 
import { DesignsCardSkeleton } from '../components/common/DesignsCardSkeleton';

import './../assets/css/designs.css';
import '../assets/css/designDetail.css';

export default function DesignsDetail() {

    const { t } = useTranslation();

    const { id } = useParams(); 
    
    const [designs, setDesigns] = useState(null);
    const [imgLoading, setImgLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [shareURL, setShareURL] = useState(null);
    const [designsSuggestions, setDesignsSuggestions] = useState([]);
    const [loadSug, setloadSug] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchDesignsSuggestion = async (catId, currentId) => {
            if (!catId) {
                if (isMounted) setDesignsSuggestions([]);
                return;
            }

            try {
                const res = await fetch(`${API_URL}/designs?cat_id=${catId}&status=true`);
                if (!res.ok) throw new Error('Failed to fetch suggestions');
                
                const result = await res.json();
                const items = Array.isArray(result) ? result : (result.data || []);

                // Filter out current item, then pick 6 random items
                const filtered = items.filter((item) => String(item.id) !== String(currentId));
                const shuffled = [...filtered].sort(() => 0.5 - Math.random());
                
                if (isMounted) setDesignsSuggestions(shuffled.slice(0, 6));
            } catch (err) {
                console.error("Error fetching suggestions:", err);
                if (isMounted) setDesignsSuggestions([]);
            } finally {
                if (isMounted) setloadSug(false);
            }
        };

        const fetchSingleDesigns = async () => {

            setLoading(true);
            setloadSug(true);
            setImgLoading(true);

            try {
                const res = await fetch(`${API_URL}/designs/${id}`);
                const result = await res.json();
                
                if (result.success && result.data) {
                    if (isMounted) {
                        setDesigns(result.data);
                        setShareURL(`http://vensoeng.vercel.app/share/designs/${id}`);
                    }
                    fetchDesignsSuggestion(result.data.cat_id, id);
                } else {
                    if (isMounted) setDesigns(null);
                }
            } catch (err) {
                console.error("Error fetching design details:", err);
                if (isMounted) setDesigns(null);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        if (id) {
            fetchSingleDesigns();
        }

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (loading) {
        return (
            <WebLoader>
                {t('common.loading')}...
            </WebLoader>
        );
    }

    if (!designs || String(designs.status).toLowerCase() !== "true") {
        return <NotFoundPage />;
    }

    const getImageUrl = (path) => {
        if (!path) return '';
        const cleanPath = path.trim();
        if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
            return cleanPath;
        }
        return `${API_URL}${STORAGE}${cleanPath.replace(/^\//, '')}`;
    };

    const tagsList = designs.tags
        ? designs.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
        : [];

    const galleryImages = designs.list_img
        ? designs.list_img.split(',').map((img) => img.trim()).filter(Boolean)
        : [];

    return (
        <div className="dsd09">
            <Helmet>
                <title>{`SOENG DigitalCore | ${designs.title || ''}`}</title>
                <meta name="description" content={designs.des || ''} />
                <meta property="og:title" content={`SOENG DigitalCore | ${designs.title || ''}`} />
                <meta property="og:description" content={designs.des || ''} />
            </Helmet>

            <div className="dsd-box">
                <NavBar text={designs?.title} shareLink={shareURL} linkBack={'/designs'}/>
                
                <div className="dsd-con">
                    <div className="dsdc-box df-c d07">
                        {/* Main Content Section */}
                        <div className="row main-con">
                            <div className="rbox">
                                <div className="rh">
                                    <div className="rh-box">
                                        <h2>{designs.main_ti || designs.title}</h2>
                                        <p>{designs.created_at}</p>
                                    </div>
                                </div>

                                {designs.img && (
                                    <div className="rimg">
                                        <div 
                                            className="rimg-box"
                                            style={{ 
                                                position: 'relative', 
                                                overflow: 'hidden',
                                                minHeight: '200px' 
                                            }}
                                        >
                                            {imgLoading && (
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
                                                        zIndex: 2,
                                                        backgroundColor: '#f8fafc'
                                                    }}
                                                >
                                                    <div className="spinner"></div>
                                                    <span style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
                                                        {t('homePage.services.loading')}...
                                                    </span>
                                                </div>
                                            )}

                                            <img 
                                                className="img-co" 
                                                src={getImageUrl(designs.img)} 
                                                alt={designs.title || 'Design Image'}
                                                onLoad={() => setImgLoading(false)}
                                                onError={() => setImgLoading(false)}
                                                style={{ opacity: imgLoading ? 0 : 1, transition: 'opacity 0.3s ease' }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="rdetail">
                                    <div className="rdetail-box">
                                        <h2>{designs.title || designs.main_ti}</h2>
                                        <p>{designs.des}</p>
                                    </div>
                                </div>

                                <div className="rhat">
                                    <div className="rhat-box df-l">
                                        {tagsList.map((tag, idx) => (
                                            <div key={idx} className="btn">
                                                #{tag.toUpperCase()}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rtxt">
                                    <div className="rtxt-box">
                                        <p>{designs.detail || t('designsPage.noData')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row list-img">
                            <div className="rli-h">
                                <div className="rlih-box">
                                    <h2>{t('designsPage.detail.more')}</h2>
                                </div>
                            </div>
                            <div className="rlibox rbox">
                                {galleryImages.length === 0 ? (
                                    <div className="rli df-c" 
                                        style={{ 
                                            position: 'relative', 
                                            overflow: 'hidden',
                                            aspectRatio: '16 / 9',
                                        }}
                                    >
                                        <div className="rli-box">{t('designsPage.detail.emptyImage')}</div>
                                    </div>
                                ) : (
                                    galleryImages.map((imgPath, index) => (
                                        <ListImgDesigns img={API_URL + imgPath} key={index} />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Suggestions Section */}
                <div className="ds01">
                    <div className="d01-box">
                        <div className="d01h">
                            <div className="d01h-box">
                                <h2>{t('designsPage.detail.recommended')}</h2>
                                <p>{t('designsPage.detail.related')}</p>
                            </div>
                        </div>
                        <div className="d01c">
                            <div className="d01c-box">
                                {loadSug ? (
                                    <>
                                        {Array(3).fill(0).map((_, index) => (
                                            <DesignsCardSkeleton key={index} />
                                        ))}
                                    </>
                                ) : designsSuggestions.length === 0 ? (
                                    <p style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                                        {t('designsPage.noData')}
                                    </p>
                                ) : (
                                    designsSuggestions.map((item, index) => (
                                        <DesignsCard
                                            key={item.id || index}
                                            designs={item}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}