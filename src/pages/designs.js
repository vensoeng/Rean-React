import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
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

    const { t } = useTranslation();

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
      <div className="ds01">
        {/* update priview card share  */}
        <Helmet>
            <title>SOENG DigitalCore | Designs</title>
            <meta name="description" content="Creative poster design for events and social media. Professional banners for printing and digital use." />
            <meta property="og:title" content="VenSoeng - Business Designs" />
            <meta property="og:description" content="Creative poster design for events and social media. Professional banners for printing and digital use." />
            <meta property="og:url" content="https://vensoeng.vercel.app/services" />
        </Helmet>
        <div className="d01-box">
            {/* <!-- this Is head  --> */}
            <div className="d01h">
                <div className="d01h-box">
                    <h2>{t('designsPage.hero.title')}</h2>
                    <p>{t('designsPage.hero.desc')}</p>
                </div>
            </div>
            {/* <!-- this is content  --> */}
            <div className="d01c">
                <div className="d01c-box">
                  {
                    isLoading ? (
                      <>
                      <WebLoader>
                        {t('common.loading')}
                      </WebLoader>
                      { Array(3).fill(0).map((_, index) => (
                        <DesignsCardSkeleton key={index} />
                      ))}
                      </>
                    ) : designs.length === 0 ? (
                      <li style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                        {t('designsPage.noData')}
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
                </div>
            </div>
        </div>
    </div>
    );   
}

export default DesignsPage;