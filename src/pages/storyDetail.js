import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { API_URL, STORAGE } from '../utils/auth';

import WebLoader from '../components/common/WebLoader';
import { 
    ArrowLeft,
    Moon,
    // Link21,
    Sun1 
} from 'iconsax-reactjs';
import NotFoundPage from './404';

import QRCode from "react-qr-code";
import {
    FaFacebookF,
    FaTelegramPlane,
    FaLinkedinIn,
    FaWhatsapp,
    FaTimes
} from "react-icons/fa";


import '../assets/css/storyDetail.css';
import Footer from '../components/layout/footer';

export default function StoryDetail() {
    
    const navigate = useNavigate();

    const { id } = useParams(); 
    const [blog, setBlog] = useState(null);
    const [imgContent, setImgContent] = useState(false);
    const [htmlContent, setHtmlContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingHtml, setLoadingHtml] = useState(false);
    const [toogleTheme, setToggleTheme] = useState(false);

    const [copyText, setCopyText] = useState('ចម្លងតំណរ');

    const [showShare, setShowShare] = useState(false);
    const shareUrl = `https://vensoeng.vercel.app/share/story/${id}`;
    const copyLink = async () => {
        try {
            setCopyText('កំពុងចម្លង...');

            await navigator.clipboard.writeText(shareUrl);
            
            setCopyText('បានចម្លង!');

            setTimeout(() => {
                setCopyText('ចម្លងតំណរ');
            }, 2000);

        } catch (err) {
            console.error("Error copying link:", err);
            setCopyText('បរាជ័យ!');
            setTimeout(() => {
                setCopyText('ចម្លងតំណរ');
            }, 2000);
        }
    };
    const handleShare = async () => {
        // if (navigator.share) {
        //     try {
        //         await navigator.share({
        //             title: blog.title,
        //             text: blog.des,
        //             url: shareUrl,
        //         });
        //     } catch (err) {
        //         console.log(err);
        //     }
        // } else {
        //     setShowShare(true);
        // }
        setShowShare(true);
    };

    useEffect(() => {
        const fetchSingleBlog = async () => {
            try {
                const res = await fetch(`${API_URL}/blogs/${id}`);
                const data = await res.json();
                setBlog(data);

                if (data && data.file) {
                    setLoadingHtml(true);
                    const fileUrl = `${API_URL}/images/storage/${data.file}`;
                    const fileRes = await fetch(fileUrl);
                    const htmlText = await fileRes.text(); 
                    setHtmlContent(htmlText);
                }
            } catch (err) {
                console.error("Error fetching blog or HTML:", err);
            } finally {
                setLoading(false);
                setImgContent(true);
                setLoadingHtml(false);
            }
        };

        if (id) {
            fetchSingleBlog();
        }
    }, [id]);
     
    if (loading) {
        return (
            <WebLoader>
                យើងកំពុងធ្វើការទាញយកទិន្នន័យ...
            </WebLoader>
        );
    }

    if (!blog || Number(blog.status) !== 1) {
        return <NotFoundPage />;
    }

    const handleBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate('/storys');
        }
    };

    return (
        <div className={toogleTheme ? 'styde styde-dark' : 'styde styde-light'}>
            {/* update priview card share  */}
            <Helmet>
                <title>{`SOENG DigitalCore | ${blog?.title || ''}`}</title>
                <meta name="description" content={`${blog?.des || ''}`} />
                <meta property="og:title" content={`SOENG DigitalCore | ${blog?.title || ''}`} />
                <meta property="og:description" content={`${blog?.des || ''}`} />
            </Helmet>
            {/* this Is header  */}
            <div className='styde-head'>
                <div className='stydh-box df-s'>
                    <button 
                        type='button'
                        className='btn-home row btn ibtn'
                        onClick={handleBack}
                    >
                        <ArrowLeft />
                    </button>
                    <div className='row'>
                        <h2>{blog.title}</h2>
                    </div>
                    <div className='row df-l'>
                        <button className='btn ibtn' onClick={() => setToggleTheme(!toogleTheme)}>
                            {toogleTheme ? <Sun1 /> : <Moon />}
                        </button>
                        <button 
                            className='btn ibtn'
                            onClick={handleShare}
                        >
                        ចែករំលេក
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
                        </svg>
                            {/* <Link21 /> */}
                        </button>
                    </div>
                </div>
            </div>
            {/* this is header of content */}
            <div className='stydebox'>
                {loading && <WebLoader>យើងកំពុងធ្វើការទាញយកទិន្នន័យ..</WebLoader>}

                {!loading && (!blog || Number(blog.status) !== 1) ? (
                    // <p style={{ padding: '20px', textAlign: 'center' }}>
                    //     រកមិនឃើញទិន្នន័យ ឬអត្ថបទនេះត្រូវបានដាក់ឯកជនជន!
                    // </p>
                    <NotFoundPage></NotFoundPage>
                ) : (
                    blog && (
                        <div className="story-content">
                            {/* heade */}
                            <div className='stydeconhead' style={{ "--bg-img": `url(${API_URL + STORAGE + blog.img})` }}>
                                <div className='stydeconhead-box'>
                                    <div className={imgContent ? 'styd-img' : 'styd-img-acive'} >
                                        <img 
                                            className="img-c" 
                                            src={API_URL + STORAGE + blog.img} 
                                            alt={blog.title || "Story image"} 
                                            style={{ 
                                                opacity: 1, 
                                                transition: 'opacity 0.4s ease-in-out',
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>
                                    <div className='styd-info'>
                                        <div className='stydinbox'>
                                            <h2>{blog.title}</h2>
                                            <blockquote>
                                                <p>{blog.des}</p>
                                            </blockquote>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* content writting */}
                            {loadingHtml ? (
                                <p style={{ color: '#94a3b8' }}>កំពុងទាញយកខ្លឹមសារអត្ថបទពីប្រព័ន្ធ...</p>
                            ) : (
                                <div
                                    className="html-render-zone"
                                    dangerouslySetInnerHTML={{ __html: htmlContent || '' }}
                                />
                            )}
                        </div>
                    )
                )}

            </div>

            {/* share modal */}
            {
                showShare && (
                    <div className="share-overlay">

                        <div className="share-modal">

                            <button
                                className="share-close btn icon-ra icon-sm"
                                onClick={() => setShowShare(false)}
                            >
                                <FaTimes />
                            </button>

                            <h3>ចែករំលែក</h3>

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
                                        backgroundColor: copyText === 'បានចម្លង!' ? 'var(--sg-color-brand)' : '',
                                        color: copyText === 'បានចម្លង!' ? '#ffffff' : '',
                                        transition: 'all 0.2s ease-in-out'
                                    }}
                                >
                                    {copyText}
                                </button>

                            </div>

                        </div>

                    </div>
                )
            }

            <Footer />
        </div>
    );    
}