import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { API_URL, STORAGE } from '../utils/auth';

import WebLoader from '../components/common/WebLoader';
import NavBar from '../components/common/Navbar';

import
{ 
    // ArrowRight,
    TimerStart,
    Location,
    DollarCircle,
    BrifecaseTick,
    Note1
} from 'iconsax-reactjs';


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
    const navigate = useNavigate();
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

     // location to other location 
    const locat = (url) => {
        navigate(url);
    }

    if (loading) {
        return (
            <section id="wsd">
                <NavBar text={service?.title_kh || 'ព័ត៌មានសេវាកម្ម' } shareLink={shareUrl} linkBack={'/services'}/>
                <ServiceDetailSkeleton />
                <WebLoader>សូមរងចាំកំពុងទាញយកទិន្នន័យមកបង្ហាញ</WebLoader>
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
            <NavBar text={service?.title_kh || 'ព័ត៌មានសេវាកម្ម' } shareLink={shareUrl} linkBack={'/services'}/>

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
                                <h2>យើងសូមណែនាំនូវសាវ៉ាកម្មបន្ថែម</h2>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="nsc">
                        <div className="nsc-box">
                            {ServiceSuggestions.length === 0 ? (
                                <p style={{ textAlign: 'center', padding: '2rem' }}>មិនមានសេវាកម្មដែលត្រូវដែលចង់ណែនាំឡើយ</p>
                            ) : (
                                ServiceSuggestions.map((s, index) => (
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
                                                            <h2 onClick={() => locat('/services/detail/' + s.id)}>{s.title_kh}</h2>
                                                        </div>
                                                        <div className="descript">
                                                            <p onClick={() => locat('/services/detail/' + s.id)}>{s.description_kh || s.des_kh}</p>
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
                                                                    <div className="txt"><p>ប្រាក់កក់: {s.deposit}%</p></div>
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
                                                    <div className="mimg crop-style" onClick={() => locat('/services/detail/' + s.id)}>
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
            <Footer />
        </section>
    );    
}