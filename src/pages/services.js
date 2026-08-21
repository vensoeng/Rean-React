import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { API_URL, STORAGE } from '../utils/auth';
import WebLoader from './../components/common/WebLoader';
import {
    TimerStart,
    Location,
    DollarCircle,
    BrifecaseTick,
    Note1
} from 'iconsax-reactjs';

import './../assets/css/services.css';

const CATEGORIES_CONFIG = [
    { slug: 'all', ids: [], name: 'ទាំងអស់' },
    { slug: 'web', ids: [4], name: 'កម្មវិធី' },
    { slug: 'design', ids: [3], name: 'ការរចនា' },    
];

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
    const navigate = useNavigate();
    const location = useLocation();

    const [isTransitioning, setIsTransitioning] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');

    const { data: services = [], isLoading, isError, error } = useQuery({
        queryKey: ['services'],
        queryFn: fetchServicesData,
        staleTime: 1000 * 60 * 5,
    });

    // Sync URL search params with activeCategory state
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const categoryParam = queryParams.get('category');
        const isValidCategory = CATEGORIES_CONFIG.some(cat => cat.slug === categoryParam);

        if (categoryParam && isValidCategory) {
            setActiveCategory(categoryParam);
        } else {
            setActiveCategory('all');
        }
    }, [location.search]);

    const currentCategory = CATEGORIES_CONFIG.find(cat => cat.slug === activeCategory);

    // Compute filtered list safely based on query cache data
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

    // location to other location 
    const locat = (url) => {
        navigate(url);
    }

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
                <title>Services | VenSoeng DigitalCore</title>
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
                            <h2>ស្វែងរកសេវាកម្មដែលសមនឹងអាជីវកម្មរបស់អ្នក</h2>
                            <p>ជ្រើសរើសសេវាកម្មដែលសមស្រប មិនថាជាការអភិវឌ្ឍ Website, Mobile App, Business System ឬការរចនាសម្រាប់អាជីវកម្ម។</p>
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
                                <WebLoader>រង់ចាំបន្ដិចយើងកំពុងទាញយកទិន្នន័យដើម្បីដំណើរការ</WebLoader>
                                {renderSkeletons()}
                            </>
                        ) : isError ? (
                            <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
                                មានបញ្ហាក្នុងការទាញយកទិន្នន័យ: {error.message}
                            </p>
                        ) : filteredServices.length === 0 ? (
                            <p style={{ textAlign: 'center', padding: '2rem' }}>មិនមានសេវាកម្មឡើយ</p>
                        ) : (
                            filteredServices.map((s, index) => (
                                <div className="nsi" key={s.id || index} data-category={s?.list_id}>
                                    <div className="nsi-box df-c">
                                        <div className="nsir">
                                            <div className="nsir-box">
                                                <div className="nsirh">
                                                    <div className="status">
                                                        <span></span>
                                                        <p>{s.status === 'true' || s.status === true ? 'បើកដំណើរការ' : 'ផ្អាកដំណើរការ'}</p>
                                                    </div>
                                                    <div className="title">
                                                        <h2 onClick={ () => locat('/services/detail/' + s.id)}>{s.title_kh}</h2>
                                                    </div>
                                                    <div className="descript">
                                                        <p onClick={ () => locat('/services/detail/' + s.id)}>{s.description_kh || s.des_kh}</p>
                                                    </div>
                                                    <div className="has crop-style">
                                                        <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                                                        <div className="hasbox">
                                                            {s.tags_kh && (typeof s.tags_kh === 'string' ? s.tags_kh.split(',') : s.tags_kh).map((tag, tagIndex) => (
                                                                <div key={tagIndex} className="hi btn crop-style">
                                                                    <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                                                                    <div className="hi-box">
                                                                        <p>{tag.trim()}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            {s.tags_active_kh && (typeof s.tags_active_kh === 'string' ? s.tags_active_kh.split(',') : s.tags_active_kh).map((activeTag, activeIndex) => (
                                                                <div key={activeIndex} className="hi btn crop-style active">
                                                                    <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                                                                    <div className="hi-box">
                                                                        <p>{activeTag.trim()}</p>
                                                                    </div>
                                                                </div>
                                                            ))}                                                
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="note crop-style">
                                                    <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                                                    <div className="not-box">
                                                        <div className="nti">
                                                            <div className="nti-box df-l">
                                                                <div className="icon icon-ra icon-sm"><TimerStart /></div>
                                                                <div className="txt"><p>{s.time_kh}</p></div>
                                                            </div>
                                                        </div>
                                                        <div className="nti">
                                                            <div className="nti-box df-l">
                                                                <div className="icon icon-ra icon-sm"><Location /></div>
                                                                <div className="txt"><p>{s.location_kh}</p></div>
                                                            </div>
                                                        </div>
                                                        <div className="nti">
                                                            <div className="nti-box df-l">
                                                                <div className="icon icon-ra icon-sm"><DollarCircle /></div>
                                                                <div className="txt"><p>ប្រាក់កក់: {s.deposit}</p></div>
                                                            </div>
                                                        </div>
                                                        <div className="nti">
                                                            <div className="nti-box df-l">
                                                                <div className="icon icon-ra icon-sm"><BrifecaseTick /></div>
                                                                <div className="txt"><p>ការធានា: {s.warranty_kh}</p></div>
                                                            </div>
                                                        </div>
                                                        <div className="nti">
                                                            <div className="nti-box df-l">
                                                                <div className="icon icon-ra icon-sm"><Note1 /></div>
                                                                <div className="txt"><p>{s.note_kh || 'ទំនាក់ទំនងដើម្បីទទួលបានតម្លៃល្អ'}</p></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="nsir">
                                            <div className="nsir-box">
                                                <div className="mimg crop-style" onClick={ () => locat('/services/detail/' + s.id)}>
                                                    <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                                                    <img className="img-c" src={API_URL + STORAGE + s.img} alt={s.title_kh || "service"} loading='lazy' />
                                                </div>
                                                <div className="action">
                                                    <div className="action-box df-s">
                                                        <div className="atr">
                                                            <p>តម្លៃចាប់ផ្ដើម</p>
                                                            <h2>${s.price_start}</h2>
                                                        </div>
                                                        <div className="atr">
                                                            <Link className="btn btn-style" to={`/services/detail/${s.id}`}>
                                                                <svg fill="#000000" viewBox="0 0 400 400" id="Send" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                                    <g id="SVGRepo_iconCarrier">
                                                                        <g id="XMLID_3_">
                                                                            <polygon id="XMLID_4_" points="373.3,0 346.7,0 320,0 320,26.7 346.7,26.7 373.3,26.7 373.3,53.3 373.3,80 400,80 400,53.3 400,26.7 400,0 "></polygon>
                                                                            <polygon id="XMLID_299_" points="293.3,53.3 320,53.3 320,26.7 293.3,26.7 266.7,26.7 240,26.7 240,53.3 266.7,53.3 "></polygon>
                                                                            <polygon id="XMLID_300_" points="213.3,80 240,80 240,53.3 213.3,53.3 186.7,53.3 160,53.3 160,80 186.7,80 "></polygon>
                                                                            <polygon id="XMLID_301_" points="133.3,106.7 160,106.7 160,80 133.3,80 106.7,80 80,80 80,106.7 106.7,106.7 "></polygon>
                                                                            <polygon id="XMLID_302_" points="346.7,106.7 346.7,133.3 346.7,160 373.3,160 373.3,133.3 373.3,106.7 373.3,80 346.7,80 "></polygon>
                                                                            <polygon id="XMLID_313_" points="80,133.3 80,106.7 53.3,106.7 26.7,106.7 26.7,133.3 53.3,133.3 "></polygon>
                                                                            <rect height="26.7" id="XMLID_314_" width="26.7" x="0" y="133.3"></rect>
                                                                            <polygon id="XMLID_315_" points="186.7,160 160,160 133.3,160 106.7,160 80,160 53.3,160 26.7,160 26.7,186.7 53.3,186.7 80,186.7 106.7,186.7 133.3,186.7 160,186.7 186.7,186.7 213.3,186.7 213.3,160 "></polygon>
                                                                            <polygon id="XMLID_316_" points="320,186.7 320,213.3 320,240 346.7,240 346.7,213.3 346.7,186.7 346.7,160 320,160 "></polygon>
                                                                            <polygon id="XMLID_317_" points="293.3,266.7 293.3,293.3 293.3,320 320,320 320,293.3 320,266.7 320,240 293.3,240 "></polygon>
                                                                            <polygon id="XMLID_318_" points="240,320 240,293.3 240,266.7 240,240 240,213.3 240,186.7 213.3,186.7 213.3,213.3 213.3,240 213.3,266.7 213.3,293.3 213.3,320 213.3,346.7 213.3,373.3 240,373.3 240,346.7 "></polygon>
                                                                            <polygon id="XMLID_319_" points="266.7,346.7 266.7,373.3 293.3,373.3 293.3,346.7 293.3,320 266.7,320 "></polygon>
                                                                            <rect height="26.7" id="XMLID_320_" width="26.7" x="240" y="373.3"></rect>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                                ព័ត៌មានលំអិត
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}                    
                    </div>
                </div>
            </div>
        </div>
    );
}