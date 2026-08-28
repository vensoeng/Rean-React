import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
// import { NavLink } from 'react-router-dom';
import { API_URL } from '../utils/auth';

import WebLoader from '../components/common/WebLoader';

// import '../assets/css/story.css';
import './../assets/css/about.css';
import '../assets/css/home.css';

// this is web header 
import WebHeader from '../components/common/WebHeader';

// import Button from '../components/common/button';
import ProjectBackground from '../components/common/ProjectBackground';
// import AlienBackground from '../components/common/AlienBackground';
import StoryCard from '../components/common/StoryCard';
import StarryBackground from '../components/common/StarryBackground';
// import AdvertisementPopup from '../components/common/AdvertisementPopup';
// import StudyList from '../components/common/ListStudy';
// import Screenslider from '../components/common/Screenslider';
// founder Component
import Founder from '../components/common/founder';

import { ArrowRight } from 'iconsax-reactjs';
//webpage add on
// import AboutPage from './about';
import Questions from './question';
import ServiceSuggestion from '../components/web/Service_suggestion';
import DesignsSuggestion from '../components/web/DesignSuggestion';
// import StoryPage from './story';

// background header section 
// import BackgroundHeadSection from '../components/common/BackgroundHeadSection';


const fetchBlogsFromServer = async () => {
    const res = await fetch(`${API_URL}/blogs?limit=4`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};

export default function HomePage() {
    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogsFromServer,
        staleTime: 5 * 60 * 1000,
    });

    const { t } = useTranslation();

    return (
        <main className="web-main">
            {/* update priview card share  */}
            <Helmet>
                <title>SOENG DigitalCore Cambodia | Digital Solutions for Business</title>
            </Helmet>
            {/* <AlienBackground /> */}
            {/* <AdvertisementPopup /> */}
            <div className="main-body">
                <div className="mb-box">
                    <WebHeader />
                    {/* this is service suggestion */}
                    <ServiceSuggestion />
                    {/* this is is about my skill  */}
                    {/* <StudyList /> */}
                    {/* this is read node */}
                    <ProjectBackground />
                    {/* this is about page  */}
                    {/* <AboutPage active={false} /> */}
                    {/* ---this is design  */}
                    {/* <Screenslider 
                        mainTitle={"DESIGNS"}
                        mainDes={"ចង់ឱ្យផលិតផលរបស់អ្នកលេចធ្លោ និងទទួលបានការចាប់អារម្មណ៍ខ្លាំងមែនទេ? ការរចនា Poster ប្រកបដោយគំនិតច្នៃប្រឌិតពីយើង នឹងជួយផ្សព្វផ្សាយម៉ាកយីហោរបស់អ្នកឱ្យកាន់តែរីកសុះសាយ ព្រមទាំងជួយឱ្យអតិថិជនយល់ដឹងពីព័ត៌មានសំខាន់ៗបានភ្លាមៗត្រឹមមួយវិនាទី!"}
                    /> */}
                    {/* this is show my story  */}
                    <section className="web-main">
                        <div className="main-body">
                            <div className="mb-box">
                                <section className="me-story">
                                    <canvas id="star-canvas"></canvas>
                                    <div className="ms-box">
                                        <div className="ms-head">
                                            <div className="msh-box">
                                                <h2>{t('homePage.blog.title')}</h2>
                                                <blockquote>
                                                    <p>{t('homePage.blog.desc')}</p>
                                                </blockquote>
                                            </div>
                                        </div>
                                        <div className="ms-con">
                                            <div className="msc-box">
                                                <div className="my-story-body">
                                                    <div className='box'>
                                                        <ul>
                                                            {
                                                                isLoading ? (
                                                                    <WebLoader>
                                                                        {t('common.loading')}
                                                                    </WebLoader>
                                                                ) : blogs.length === 0 ? (
                                                                    <li style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                                                                        {t('blogPage.noData')}
                                                                    </li>
                                                                ) : (
                                                                    blogs.map((blog, index) => (
                                                                        <StoryCard
                                                                            key={index}
                                                                            blog={blog}
                                                                            newStory={true}
                                                                        />
                                                                    ))
                                                                )
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='story-main-btn df-c'>
                                            <a href='/storys' className="btn">
                                                {t('homePage.blog.more')}
                                                <ArrowRight />
                                            </a>
                                        </div>
                                    </div>
                                    <StarryBackground />
                                </section>
                            </div>
                        </div>
                    </section>
                    {/* this is design suggestion webpage */}
                    <DesignsSuggestion />
                    {/* this is question webpage  */}
                    <Questions />
                    {/* 1. Purple CTA Card Section */}
                    {/* <section className="cta-card">
                        <div className="cta-card-box">
                            <h2 className="cta-title">ទំនាក់ទំនងសេវ៉ាកម្ម</h2>
                            <p className="cta-description">
                            រកសេវាកម្មល្អៗបាននៅទីនេះ! រាល់ការគាំទ្ររបស់បងៗ គឺជាកម្លាំងចិត្តឱ្យ ខ្ញុំបន្តស្វែងរកអ្វីដែលថ្មី និងឥតគិតថ្លៃមកចែករំលែកបន្តទៀត។
                            </p>
                            <form className="cta-form" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="គណនីអ៊ីមែល example@email.com" 
                                className="cta-input" 
                                required 
                            />
                            <button type="submit" className="cta-button">ចាប់ផ្ដើម</button>
                            </form>
                        </div>
                    </section> */}

                    {/* <!-- style  --> */}
                    <Founder />
                </div>
            </div>
        </main>
    )
}