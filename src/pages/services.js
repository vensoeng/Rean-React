import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation} from 'react-router-dom';

import { API_URL} from '../utils/auth';
import WebLoader from './../components/common/WebLoader';
// card
import ServiceCard from '../components/common/serviceCard';


import './../assets/css/services.css';

const fetchServicesData = async () => {
    const res = await fetch(`${API_URL}/services?status=true`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const resData = await res.json();
    
    if (resData && Array.isArray(resData.data)) return resData.data;
    if (resData && Array.isArray(resData.services)) return resData.services;
    if (Array.isArray(resData)) return resData;
    return [];
};

export default function Services() {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();

    const CATEGORIES_CONFIG = useMemo(() => [
        { slug: 'all', ids: [], name: t('servicePage.filter.all') },
        { slug: 'web', ids: [4], name: t('servicePage.filter.app') },
        { slug: 'design', ids: [3], name: t('servicePage.filter.design') },    
    ], [t]);
    
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');

    const { data: services = [], isLoading, isError, error } = useQuery({
        queryKey: ['services'],
        queryFn: fetchServicesData,
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const categoryParam = queryParams.get('category');
        const isValidCategory = CATEGORIES_CONFIG.some(cat => cat.slug === categoryParam);

        if (categoryParam && isValidCategory) {
            setActiveCategory(categoryParam);
        } else {
            setActiveCategory('all');
        }
    }, [location.search, CATEGORIES_CONFIG]);

    const currentCategory = CATEGORIES_CONFIG.find(cat => cat.slug === activeCategory);

    const filteredServices = activeCategory === 'all' 
        ? services
        : services.filter(s => currentCategory?.ids.includes(Number(s?.list_id)));

    const handleCategoryChange = (slug) => {
        if (slug === activeCategory) return;
        setIsTransitioning(true);
        setActiveCategory(slug);

        if (slug === 'all') {
            navigate('/services');
        } else {
            navigate(`/services?category=${slug}`);
        }

        setTimeout(() => {
            setIsTransitioning(false);
        }, 250);
    };

    const renderSkeletons = () => {
        return Array(3).fill(0).map((_, idx) => (
            <div key={`skeleton-${idx}`} className='service-list skeleton-card-loading'>
                <div className='sl-h df-l' style={{ background: '#e0e0e0', height: '80px', position: 'relative', overflow: 'hidden' }}>
                    <div className='skeleton-shimmer'></div>
                </div>
                <div className='sl-c'>
                    <div className='slc-box' style={{ padding: '1.5rem' }}>
                        <div className='skeleton-line title' style={{ width: '60%', height: '20px', background: '#e0e0e0', marginBottom: '15px', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}><div className='skeleton-shimmer'></div></div>
                        <div className='skeleton-line desc' style={{ width: '90%', height: '14px', background: '#e0e0e0', marginBottom: '10px', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}><div className='skeleton-shimmer'></div></div>
                        <div className='skeleton-line desc' style={{ width: '40%', height: '14px', background: '#e0e0e0', marginBottom: '20px', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}><div className='skeleton-shimmer'></div></div>
                        <div className='sl-sp' style={{ display: 'flex', gap: '8px' }}>
                            <div style={{ width: '60px', height: '25px', background: '#e0e0e0', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}><div className='skeleton-shimmer'></div></div>
                            <div style={{ width: '80px', height: '25px', background: '#e0e0e0', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}><div className='skeleton-shimmer'></div></div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };
    
    return (
        <div className="ns01">
            <Helmet>
                <title>SOENG DigitalCore | Services</title>
                <meta name="description" content="Professional solutions for your digital needs. រកសេវាកម្មល្អៗបាននៅទីនេះ!" />
                <meta property="og:title" content="VenSoeng - Business Services" />
                <meta property="og:description" content="Professional solutions for your digital needs. រកសេវាកម្មល្អៗបាននៅទីនេះ!" />
                <meta property="og:url" content="https://vensoeng.vercel.app/services" />
            </Helmet>
            <div className="ns-box">
                {/* Header Hero */}
                <div className="nsh">
                    <div className="nshc df-c crop-style">
                        <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                        <div className="nsh-box">
                            <h2>{t('servicePage.hero.title')}</h2>
                            <p>{t('servicePage.hero.desc')}</p>
                        </div>
                    </div>
                </div>

                {/* Category Navigation */}
                <nav className="nsn">
                    <div className="nsn-box df-c">
                        {CATEGORIES_CONFIG.map((cat) => (
                            <button 
                                key={cat.slug}
                                className={`btn btn-style ${activeCategory === cat.slug ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(cat.slug)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Content Section */}
                <div className="nsc">
                    <div className="nsc-box">
                        {isLoading || isTransitioning ? (
                            <>
                                <WebLoader>{t('common.loading')}</WebLoader>
                                {renderSkeletons()}
                            </>
                        ) : isError ? (
                            <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
                                {error.message}
                            </p>
                        ) : filteredServices.length === 0 ? (
                            <p style={{ textAlign: 'center', padding: '2rem' }}>{t('servicesPage.noData')}</p>
                        ) : (
                            filteredServices.map((s, index) => (
                                <ServiceCard 
                                    key={s.id || index} 
                                    service={s}
                                    index={index} 
                                />
                            ))
                        )}                    
                    </div>
                </div>
            </div>
        </div>
    );
}