import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';

import { API_URL } from '../utils/auth';

import WebLoader from './../components/common/WebLoader';
import Questions from './question';
import {
    TimerStart,
    Location,
    DollarCircle,
    BrifecaseTick,
    Note1,
    ArrowRight,
    Sms,
    ArrowLeft
} from 'iconsax-reactjs';

import imgTest from './../assets/img/logo192.png';
import servicesBg from './../assets/img/services_bg.jpg';
import './../assets/css/services.css';

const CATEGORIES_CONFIG = [
    { slug: 'all', ids: [], name: 'ទាំងអស់' },
    { slug: 'photo', ids: [1], name: 'រូបថត' },     
    { slug: 'video', ids: [2], name: 'វីដេអូ' },      
    { slug: 'design', ids: [3], name: 'ការរចនា' },    
    { slug: 'web', ids: [4], name: 'គេហទំព័រ' }
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

    const renderSkeletons = () => {
        return Array(3).fill(0).map((_, idx) => (
            <li key={`skeleton-${idx}`}>
                <div className='service-list skeleton-card-loading'>
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
            </li>
        ));
    };
    
    return (
        <div className="main-service mser">
            <div className="mser-box">
                {/* Header */}
                <div className="msh">
                    <nav className='db-c'>
                        <div className='mshn-box df-s'>
                            <button className='btn' onClick={() => navigate(-1)}>
                                <ArrowLeft/>
                            </button>
                            <div className="smh-row">
                                <a href="mailto:vensoeng.edu.kh@gmail.com" className='btn'>
                                    <Sms/>
                                    {/* ទាក់ទងមកបង! */}
                                </a>
                            </div>
                        </div>
                    </nav>
                    <div className="msh-box">
                        <div className="smh-row">
                            <h2>ហាងតូចរបស់ Admin</h2>
                            <blockquote>
                                <p>Professional solutions for your digital needs. រកសេវាកម្មល្អៗបាននៅទីនេះ! រាល់ការគាំទ្ររបស់បងៗ គឺជាកម្លាំងចិត្តឱ្យ ខ្ញុំបន្តស្វែងរកអ្វីដែលថ្មី និងឥតគិតថ្លៃមកចែករំលែកបន្តទៀត。</p>
                            </blockquote>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="ms-nav">
                    <div className="smn-box">
                        <ul className='df-l'>
                            {CATEGORIES_CONFIG.map((cat, index) => (
                                <li key={index}>
                                    <button 
                                        className={`btn ${activeCategory === cat.slug ? 'active' : ''}`}
                                        onClick={() => handleCategoryChange(cat.slug)}
                                    >
                                        {cat.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Content */}
                <div className='mscon'>
                    <div className='mscon-box'>
                        <ul>
                            {/* 3. Combined local animation state with query state */}
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
                                    <li key={s.id || index} data-category={s?.list_id}>
                                        <div className='service-list'>
                                            {/* List Header */}
                                            <div className='sl-h df-l'>
                                                <div className='sl-box df-s'>
                                                    <div className='sl-avata icon icon-sm over-h'>
                                                        <img className='img-c' src={imgTest} loading='lazy' alt='profile' />
                                                    </div>
                                                    <div className='sl-status'>
                                                        <blockquote className={s.status === 'true' ? 'btn active' : 'btn'}>
                                                            <p>{s.status === 'true' ? 'បើកដំណើរការ' : 'ផ្អាកដំណើរការ'}</p>
                                                        </blockquote>
                                                    </div>
                                                    <div className='slh-bg'>
                                                        <img className='img-c' src={servicesBg} loading='lazy' alt='background' />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* List Content */}
                                            <div className='sl-c'>
                                                <div className='slc-box'>
                                                    <blockquote>
                                                        <h2>{s.title_kh}</h2>
                                                        <p>{s.description_kh || s.des_kh}</p> 
                                                    </blockquote>
                                                    
                                                    {/* Tags Section */}
                                                    <div className='sl-sp'>
                                                        {s.tags_kh && (typeof s.tags_kh === 'string' ? s.tags_kh.split(',') : s.tags_kh).map((tag, tagIndex) => (
                                                            <span key={tagIndex} className='btn'>
                                                                {tag.trim()}
                                                            </span>
                                                        ))}
                                                        {s.tags_active_kh && (typeof s.tags_active_kh === 'string' ? s.tags_active_kh.split(',') : s.tags_active_kh).map((activeTag, activeIndex) => (
                                                            <span key={activeIndex} className='btn active'>
                                                                {activeTag.trim()}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <div className='slls-main'>
                                                        <div className='sll-l df-l'>
                                                            <div className='icon icon-sm icon-ra'><TimerStart /></div>
                                                            <blockquote><p>{s.time_kh}</p></blockquote>
                                                        </div>
                                                        <div className='sll-l df-l'>
                                                            <div className='icon icon-sm icon-ra'><Location /></div>
                                                            <blockquote><p>{s.location_kh}</p></blockquote>
                                                        </div>
                                                        <div className='sll-l df-l'>
                                                            <div className='icon icon-sm icon-ra'><DollarCircle /></div>
                                                            <blockquote><p>ប្រាក់កក់: {s.deposit}</p></blockquote>
                                                        </div>
                                                        <div className='sll-l df-l'>
                                                            <div className='icon icon-sm icon-ra'><BrifecaseTick /></div>
                                                            <blockquote><p>ការធានា: {s.warranty_kh}</p></blockquote>
                                                        </div>
                                                        <div className='sll-l df-l'>
                                                            <div className='icon icon-sm icon-ra'><Note1 /></div>
                                                            <blockquote><p>{s.re_change_kh || 'អាចស្នើប្ដូរបាន'}</p></blockquote>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* List Footer */}
                                            <div className='sl-f'>
                                                <div className='slf-box df-s'>
                                                    <div className='slf-row'>
                                                        <blockquote>
                                                            <p>តម្លៃចាប់ផ្ដើម</p>
                                                            <h2>{s.price}</h2>
                                                        </blockquote>
                                                    </div>
                                                    <div className='slf-row'>
                                                        <NavLink to={`/services/detail/${s.id}`} className='btn'>
                                                            ព័ត៌មានលំអិត
                                                            <ArrowRight/>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <Questions/>
       </div> 
    );
}