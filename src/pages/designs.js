import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../utils/auth';
import { Helmet } from 'react-helmet-async';

import WebLoader from '../components/common/WebLoader';
import DesignsCard from '../components/common/DesignsCard_sm'; 
import { DesignsCardSkeleton } from '../components/common/DesignsCardSkeleton';

import './../assets/css/designs.css';

// 1. Fetch data backend
const fetchDesignsFromServer = async () => {
    const res = await fetch(`${API_URL}/designs`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const resData = await res.json();
    return resData?.data || [];
};

function DesignsPage() {

    // 2. React Query
    const queryResult = useQuery({
        queryKey: ['designs', 'all'],          
        queryFn: fetchDesignsFromServer,  
        staleTime: 5 * 60 * 1000, 
    });

    // 3. បង្កើតអថេរដោយសុវត្ថិភាព
    const designs = queryResult.data || [];
    const isLoading = queryResult.isLoading;

    return (
        <section className="wd-section web-designs wds">
            {/* update priview card share  */}
            <Helmet>
                <title>VenSoeng - Business Designs</title>
                <meta name="description" content="Creative poster design for events and social media. Professional banners for printing and digital use." />
                <meta property="og:title" content="VenSoeng - Business Designs" />
                <meta property="og:description" content="Creative poster design for events and social media. Professional banners for printing and digital use." />
                <meta property="og:url" content="https://vensoeng.vercel.app/services" />
            </Helmet>
            <div className="wds-box">
                <div className="wdsb-row wdsbrc">
                    <div className="dsbr-box">
                        <ul>
                          {
                            isLoading ? (
                              <>
                              <WebLoader>
                                រង់ចាំបន្ដិចយើងកំពុងទាញយកទិន្នន័យដើម្បីដំណើរការ
                              </WebLoader>
                              { Array(3).fill(0).map((_, index) => (
                                <DesignsCardSkeleton key={index} />
                              ))}
                              </>
                            ) : designs.length === 0 ? (
                              <li style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                                មិនមានទិន្នន័យអត្ថបទឡើយ។
                              </li>
                            ) : (
                              [...designs].map((blog, index) => (
                                <DesignsCard
                                  key={blog.id || index}
                                  designs={blog}
                                />
                              ))
                            )
                          }
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );   
}

export default DesignsPage;