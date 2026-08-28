import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { API_URL} from '../utils/auth';

import WebLoader from '../components/common/WebLoader';
// card
import ServiceCard from '../components/common/serviceCard';
import NavBar from '../components/common/Navbar';

import NotFoundPage from './404';

import './../assets/css/services.css';
import '../assets/css/serviceDetail.css';

// import Defualt_img from '../assets/img/defualt_img.webp';
import Footer from '../components/layout/footer';
// import { title } from 'framer-motion/client';

function ServiceDetailSkeleton() {
    return (
        <div className="wsd-c skeleton-loading">
            <div className="wsdc-box df-s">
                <div className="wsdc-row">
                    <div className="wsdcr-box">
                        <div className="cr-h">
                            <div className="img skeleton" style={{ height: '300px', borderRadius: '12px' }}></div>
                            <div className="img-slide scroll-x" style={{ marginTop: '15px' }}>
                                <div className="df-l" style={{ gap: '12px' }}>
                                    <div className="skeleton" style={{ width: '120px', height: '80px', borderRadius: '8px' }}></div>
                                    <div className="skeleton" style={{ width: '120px', height: '80px', borderRadius: '8px' }}></div>
                                    <div className="skeleton" style={{ width: '120px', height: '80px', borderRadius: '8px' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="cr-c" style={{ marginTop: '20px' }}>
                            <div className="skeleton" style={{ width: '40%', height: '24px', marginBottom: '15px' }}></div>
                            <div className="skeleton" style={{ width: '100%', height: '16px', marginBottom: '8px' }}></div>
                            <div className="skeleton" style={{ width: '90%', height: '16px', marginBottom: '8px' }}></div>
                        </div>
                    </div>
                </div>
                <div className="wsdc-row">
                    <div className="wsdcr-box">
                        <div className="skeleton" style={{ width: '100%', height: '150px', borderRadius: '12px' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ServicesDetail() {
    const { t, i18n } = useTranslation();
    const { id } = useParams(); 
    const [service, setService] = useState(null);
    const [htmlContent, setHtmlContent] = useState('');
    const [loading, setLoading] = useState(true);

    // const [designs, setDesigns] = useState([]);

    const [ServiceSuggestions, setServiceSuggestions] = useState([]);

    useEffect(() => {
        
        const fetchServiceSuggestions = async (currentService) => {
            if (!currentService || !currentService.list_id) {
                setServiceSuggestions([]);
                return;
            }

            try {
                const res = await fetch(`${API_URL}/services?list_id=${currentService.list_id}&status=true`);
                if (!res.ok) {
                    setServiceSuggestions([]);
                    return;
                }

                const result = await res.json();

                // Ensure result.data is an array before calling .filter()
                if (result && result.success && Array.isArray(result.data)) {
                    const actualSuggestions = result.data.filter(s => s.id !== currentService.id);
                    setServiceSuggestions(actualSuggestions);
                } else {
                    setServiceSuggestions([]);
                }
            } catch (err) {
                console.error("Error fetching service suggestions:", err);
                setServiceSuggestions([]);
            }
        };

        const fetchSingleService = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${API_URL}/services/${id}`);
                
                if (!res.ok) {
                    setService(null);
                    return;
                }

                const result = await res.json();
                
                if (result && result.success && result.data) {
                    const actualData = result.data;
                    setService(actualData);

                    // Fetch HTML file if it exists
                    if (actualData.file && actualData.file.trim() !== "") {
                        const fileUrl = `${API_URL}/images/storage/${actualData.file}`;
                        const fileRes = await fetch(fileUrl);
                        if (fileRes.ok) {
                            const htmlText = await fileRes.text(); 
                            setHtmlContent(htmlText);
                        }
                    }
                    
                    // await fetchDesigns(actualData);
                   await fetchServiceSuggestions(actualData);
                } else {
                    setService(null);
                }
            } catch (err) {
                console.error("Error fetching service or HTML:", err);
                setService(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSingleService();
        }
        
    }, [id]);

    const shareUrl = `https://vensoeng.vercel.app/share/service/${id}`;

    if (loading) {
        return (
            <section id="wsd">
                <NavBar text={service?.title_kh || 'ព័ត៌មានសេវាកម្ម' } shareLink={shareUrl} linkBack={'/services'}/>
                <ServiceDetailSkeleton />
                <WebLoader>{t('common.loading')}</WebLoader>
            </section>
        );
    }

    if (!service || service.status === false || service.status === 'false' || Number(service.status) === 0) {
        return <NotFoundPage />;
    }

    return (
        <section id="wsd">
            {/* update priview card share  */}
            <Helmet>
                <title>{`SOENG DigitalCore | ${service?.title || ''}`}</title>
                <meta name="description" content={`${service?.description || ''}`} />
                <meta property="og:title" content={`SOENG DigitalCore | ${service?.title || ''}`} />
                <meta property="og:description" content={`${service?.description || ''}`} />
            </Helmet>

            {/* this Is nav  */}
            <NavBar text={i18n.language === 'kh' ? service.title_kh : service.title } shareLink={shareUrl} linkBack={'/services'}/>

            <div className="wsd-c">
                <div className="wsdc-box">
                    {/* ផ្នែកខាងឆ្វេង៖ រូបភាព និង HTML Content */}
                    {htmlContent && (
                        <div className="html-fetched-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    )}
                </div>
            </div>
            
            <div className="ns01">
                <div className="ns-box">
                    {/* Header Hero */}
                    <div className="nsh">
                        <div className="nshc df-c crop-style">
                            <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                            <div className="nsh-box">
                                <h2>{t('servicePage.additional')}</h2>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="nsc">
                        <div className="nsc-box">
                            {ServiceSuggestions.length === 0 ? (
                                <p style={{ textAlign: 'center', padding: '2rem' }}>{t('servicePage.noData')}</p>
                            ) : (
                                ServiceSuggestions.map((s, index) => (
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
            <Footer />
        </section>
    );    
}