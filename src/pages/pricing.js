import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { API_URL} from '../utils/auth';
import WebLoader from './../components/common/WebLoader';
import Questions from './question';
import './../assets/css/pricing.css';

const fetchServicePriceFromServer = async () => {
    const res = await fetch(`${API_URL}/services?status=true`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};

export default function PricingPage() {
    const { data: servicePrice = [], isLoading } = useQuery({
        queryKey: ['servicePrice', 'sAll'],             
        queryFn: fetchServicePriceFromServer,  
        staleTime: 5 * 60 * 1000,     
    });

    const servicesList = Array.isArray(servicePrice) 
    ? servicePrice 
    : servicePrice?.data || [];

    return (
    <>
    <section className="price08">
        <Helmet>
          <title>Soeng DigitalCore | Pricing</title>
          <meta name="description" content="Creative and effective solutions for websites and mobile." />
          <meta property="og:title" content="Soeng DigitalCore | Pricing" />
          <meta property="og:description" content="Creative and effective solutions for websites and mobile." />
          <meta property="og:url" content="https://vensoeng.vercel.app/storys" />
      </Helmet>
        <div className="pb08">
            {/* <!-- header  --> */}
            <div className="ph08 crop-style">
                <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                <div className="phb df-c">
                    <blockquote>
                        <h2>ឈ្មោះ និងតម្លៃសេវ៉ាកម្ម</h2>
                        <p>ជ្រើសរើសកញ្ចប់សេវាកម្មដែលអ្នកត្រូវការ ដើម្បីជួយកាត់បន្ថយការងារ បង្កើនផលិតភាព និងជំរុញអាជីវកម្មឱ្យរីកចម្រើន។</p>
                    </blockquote>
                </div>
            </div>
            <div className="pc08">
                <div className="pcb08">
                    <ul className="pul8">
                        <li className="pcl">
                            <div className="pl08 df-s">
                                <div className="pn8 ll08 df-c">
                                    <h2>ឈ្មោះសេវ៉ាកម្ម</h2>
                                </div>
                                <div className="pd8 ll08 df-c">
                                    <h2>ការពិពណ៌នា</h2>
                                </div>
                                <div className="pp8 ll08 df-c">
                                    <h2>តម្លៃសេវ៉ាកម្ម</h2>
                                </div>
                                <div className="pc8 ll08 df-c">
                                    <h2>ផ្សេងៗ</h2>
                                </div>
                            </div>
                        </li>
                        {
                            isLoading ? (
                                <WebLoader>
                                    រង់ចាំបន្ដិចយើងកំពុងទាញយកទិន្នន័យដើម្បីដំណើរការ
                                </WebLoader>
                            ) : servicesList.length === 0 ? (
                                <li style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                                    មិនមានទិន្នន័យអត្ថបទឡើយ។
                                </li>
                            ) : (
                                servicesList.map((s, index) => (
                                    <li className="pcl" key={index}>
                                        <div className="pl08 df-s">
                                            <div className="pn8 ll08">
                                                <h3>{s.title_kh}</h3>
                                                <div className="status btn">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 3h1a28.424 28.424 0 0 0 0 18H8M15 3a28.424 28.424 0 0 1 0 18" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16v-1a28.424 28.424 0 0 0 18 0v1M3 9a28.424 28.424 0 0 1 18 0" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                                    <span>បើកដំណើរការ</span>
                                                </div>
                                            </div>
                                            <div className="pd8 ll08">
                                                <a href={'/services/detail/' + s.id} className="ac8">
                                                   <p>{s.description_kh}</p>
                                                </a>
                                            </div>
                                            <div className="pp8 ll08">
                                                <p>តម្លៃផ្ដើមពី</p>
                                                <h3>$<span>
                                                     {s.price_start != null
                                                    ? Number(s.price_start).toFixed(2)
                                                    : "--"}
                                                </span>
                                                </h3>
                                            </div>
                                            <div className="pc8 ll08">
                                                <a href={'/booking/service/' + s.id} className="btn btn-style">
                                                    ពិភាក្សាសេវាកម្ម
                                                </a>
                                                <a href={'/services/detail/' + s.id} className="action">ព័ត៌មានលំអិត</a>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    </section>
    {/* this is question webpage  */}
    <Questions />
    </>
 );   
}