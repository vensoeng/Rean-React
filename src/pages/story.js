import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../utils/auth';
import { Helmet } from 'react-helmet-async';

import WebLoader from '../components/common/WebLoader';

import '../assets/css/story.css';
import StoryCard from '../components/common/StoryCard';
import StarryBackground from '../components/common/StarryBackground';


const fetchBlogsFromServer = async () => {
    const res = await fetch(`${API_URL}/blogs`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};

export default function StoryPage({active = true})
{    
    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ['blogs', 'all'],             
        queryFn: fetchBlogsFromServer,  
        staleTime: 5 * 60 * 1000,     
    });

    return (
        <main  className={active ? "web-main web-main-active" : "web-main"}>
            {/* update priview card share  */}
            <Helmet>
                <title>VenSoeng - Business Blog</title>
                <meta name="description" content="ស្វែងរក និងអានព្រឹត្តិការណ៍ផ្សេងៗដែលមានការបង្កើតជាប្រចាំ!" />
                <meta property="og:title" content="VenSoeng - Business Blog" />
                <meta property="og:description" content="ស្វែងរក និងអានព្រឹត្តិការណ៍ផ្សេងៗដែលមានការបង្កើតជាប្រចាំ!" />
                <meta property="og:url" content="https://vensoeng.vercel.app/storys" />
            </Helmet>
            <div className="main-body mbs09">
                <div className="mb-box">
                    <section className="me-story">
                        
                        <div className="ms-box">
                            <div className="ms-head">
                                <div className="msh-box">
                                    <h2>អត្ថបទ និងបទពិសោធន៍</h2>
                                    <blockquote>
                                        <p>ចែករំលែកបទពិសោធន៍ ដំណោះស្រាយឌីជីថល និងសមិទ្ធផលការងារថ្មីៗ!</p>
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
                                                            រង់ចាំបន្ដិចយើងកំពុងទាញយកទិន្នន័យដើម្បីដំណើរការ
                                                        </WebLoader>
                                                    ) : blogs.length === 0 ? (
                                                        <li style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                                                            មិនមានទិន្នន័យអត្ថបទឡើយ។
                                                        </li>
                                                    ) : (
                                                        blogs.map((blog, index) => (
                                                            <StoryCard
                                                                key={index}
                                                                blog={blog}
                                                            />
                                                        ))
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isLoading ? (
                                ''
                            ):(
                            <div className='story-main-btn df-c'>
                                <NavLink to='/' className="btn">
                                    ទៅកាន់ទំេព័រដើម
                                </NavLink>
                            </div>
                            )}
                        </div>
                        <StarryBackground />
                    </section>
                </div>
            </div>
        </main>
    );
}