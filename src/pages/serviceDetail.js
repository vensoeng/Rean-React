import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, STORAGE } from '../utils/auth';

import WebLoader from '../components/common/WebLoader';
import
{ 
    ArrowLeft,
    Category,
    ArrowRight,
    TimerStart,
    Location,
    DollarCircle,
    BrifecaseTick,
    Note1

} from 'iconsax-reactjs';
import NotFoundPage from './404';

import '../assets/css/serviceDetail.css';
import Defualt_img from '../assets/img/defualt_img.webp';


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

    const [designs, setDesigns] = useState([]);

    useEffect(() => {

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
                    
                    await fetchDesigns(actualData);

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

        const fetchDesigns = async (currentService) => {
            if (!currentService || !currentService.list_id) return;

            const serviceIdMap = [
                { name: 'photo', list_id: 1, ds_carId: [4, 5] },
                { name: 'video', list_id: 2, ds_carId: [1] },
                { name: 'designs', list_id: 3, ds_carId: [1, 2, 3, 4, 5] },
                { name: 'website', list_id: 4, ds_carId: [6] }
            ];

            const matchedConfig = serviceIdMap.find(
                item => String(item.list_id) === String(currentService.list_id)
            );

            if (!matchedConfig || !matchedConfig.ds_carId || matchedConfig.ds_carId.length === 0) {
                setDesigns([]);
                return;
            }

            try {
                const catIdsString = matchedConfig.ds_carId.join(',');
                const response = await fetch(
                    `${API_URL}/designs?cat_id=${catIdsString}&limit=4&random=true`
                );
                
                if (!response.ok) {
                    setDesigns([]);
                    return;
                }

                const result = await response.json();
                
                if (result && result.success && result.data) {
                    setDesigns(result.data);
                } else {
                    setDesigns([]);
                }
            } catch (err) {
                console.error("Error fetching designs:", err);
                setDesigns([]);
            }
        };

        if (id) {
            fetchSingleService();
        }
        
    }, [id]);

    if (loading) {
        return (
            <section id="wsd">
                <nav className="wsdn">
                    <div className="wsdn-box df-s">
                        <div className="wsdn-row df-l">
                            <div className="icon icon-sm icon-ra" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                                <ArrowLeft />
                            </div>
                            <h2>ព័ត៌មានសេវាកម្ម</h2>
                        </div>
                        <div className="wsdn-row">
                            <div className="icon icon-sm icon-ra">
                                <Category />
                            </div>
                        </div>
                    </div>
                </nav>
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
            <nav className="wsdn">
                <div className="wsdn-box df-s">
                    <div className="wsdn-row df-l">
                        <div className="icon icon-sm icon-ra" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                          <ArrowLeft />
                        </div>
                        <h2>ព័ត៌មានសេវាកម្ម</h2>
                    </div>
                    <div className="wsdn-row">
                        <div className="icon icon-sm icon-ra">
                          <Category />
                        </div>
                    </div>
                </div>
            </nav>

            <div className="wsd-c">
                <div className="wsdc-box df-s">
                    
                    {/* ផ្នែកខាងឆ្វេង៖ រូបភាព និង HTML Content */}
                    <div className="wsdc-row">
                        <div className="wsdcr-box">
                            <div className="cr-h">
                                <div className="img">
                                    <p className="btn">
                                        {Number(service.status) === 1 || service.status === 'true' || service.status === true ? 'បើកដំណើរការ' : 'ផ្អាកដំណើរការ'}
                                    </p>
                                    <img 
                                        className="img-c" 
                                        src={service.img ? `${API_URL}${STORAGE}${service.img}` : Defualt_img} 
                                        alt={service.title_kh || service.title} 
                                    />
                                </div>
                                
                                {designs && (
                                    <div className="img-slide scroll-x">
                                        <ul className="df-l">
                                            {designs.map((d, i) => (
                                                <li key={i}>
                                                    <div className="box">
                                                        <div className="btn">
                                                            <ArrowRight />
                                                        </div>
                                                        <div className="img">
                                                            <img className="img-c" src={`${API_URL}${STORAGE}${d.img}`} alt={`Slide ${i + 1}`} />
                                                        </div>
                                                        <blockquote>
                                                            <p>{d.title}</p>
                                                        </blockquote>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="action df-s">
                                    <h2>អ្វីដែលខ្ញុំធ្លាប់ធ្វើពីមុន</h2>
                                    <span></span>
                                    <button className="btn">មើលបន្ថែម</button>
                                </div>
                            </div>

                            {/* radner HTML content */}
                            {htmlContent && (
                                <div className="html-fetched-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                            )}
                        </div>
                    </div>

                    <div className="wsdc-row">
                        <div className="wsdcr-box">
                            <div className="wsd-item">
                                <div className="wsdi-box">
                                    <div className="wsdi-h">
                                        <h2>{service.title_kh || service.title}</h2>
                                        <blockquote>
                                            <p>{service.description_kh || service.description}</p>
                                        </blockquote>
                                    </div>

                                    {/* Tech Tags */}
                                    <div className="wsdi-tage">
                                        <div className="wsdit-box df-s">
                                            {service.tags_kh && (typeof service.tags_kh === 'string' ? service.tags_kh.split(',') : service.tags_kh).map((tag, tagIndex) => (
                                                <span key={tagIndex} className='btn'>
                                                    {tag.trim()}
                                                </span>
                                            ))}
                                            {service.tags_active_kh && (typeof service.tags_active_kh === 'string' ? service.tags_active_kh.split(',') : service.tags_active_kh).map((activeTag, activeIndex) => (
                                                <span key={activeIndex} className='btn active'>
                                                    {activeTag.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Working Hours */}
                                    <div className="wsdi-status">
                                        <div className="wsdis-box">
                                            <ul>
                                                <li className="df-l">
                                                    <div className="icon icon-sm icon-ra">
                                                        <TimerStart />
                                                    </div>
                                                    <blockquote>
                                                        <p>ម៉ោងធ្វើការ</p>
                                                        <h2>{service.time_kh}</h2>
                                                    </blockquote>
                                                </li>
                                                <li className="df-l">
                                                    <div className="icon icon-sm icon-ra">
                                                        <Location />
                                                    </div>
                                                    <blockquote>
                                                        <p>ទីតាំង</p>
                                                        <h2>{service.location_kh}</h2>
                                                    </blockquote>
                                                </li>
                                                <li className="df-l">
                                                    <div className="icon icon-sm icon-ra">
                                                        <DollarCircle />
                                                    </div>
                                                    <blockquote>
                                                        <p>ប្រាក់កក់</p>
                                                        <h2>{service.deposit}%</h2>
                                                    </blockquote>
                                                </li>
                                                <li className="df-l">
                                                    <div className="icon icon-sm icon-ra">
                                                       <BrifecaseTick />
                                                    </div>
                                                    <blockquote>
                                                        <p>ការធានា</p>
                                                        <h2>{service.warranty_kh}</h2>
                                                    </blockquote>
                                                </li>
                                                <li className="df-l">
                                                    <div className="icon icon-sm icon-ra">
                                                        <Note1 />
                                                    </div>
                                                    <blockquote>
                                                        <p>ចំណាំ</p>
                                                        <h2>{service.note_kh}</h2>
                                                    </blockquote>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Action Box */}
                            <div className="wsd-actin">
                                <div className="wsda">
                                    <div className="wsdah df-s">
                                        <div className="wsdah-row">
                                            <blockquote>
                                                <p>តម្លៃផ្ដើមពី</p>
                                                <h2>${service.price_start || "--"}</h2>
                                            </blockquote>
                                        </div>
                                        <div className="wsdah-row">
                                            <blockquote>
                                                <p>ទំនួលខុសត្រូវខ្ពស់ពី</p>
                                                <h2>©VenSoeng</h2>
                                            </blockquote>
                                        </div>
                                    </div>
                                    <div className="gtfix">
                                        <div className="wsdaf-a">
                                            <a href={`/booking/service/${service.id}`} className="wsdaf-btn btn">កក់ឥឡូវនេះ</a>
                                        </div>
                                        <div className="wsdaf df-c">
                                            <p>{service.note_kh || "មិនគិតថ្លៃសម្រាប់ការពិគ្រោះយោបល់ដំបូង"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );    
}